import frappe
import json

@frappe.whitelist(allow_guest=True)
def response(message, data, success, status_code):
    '''method to generates responses of an API
       args:
            message : response message string
            data : json object of the data
            success : True or False depending on the API response
            status_code : status of the request'''
    frappe.clear_messages()
    frappe.local.response["message"] = message
    frappe.local.response["data"] = data
    frappe.local.response["success"] = success
    frappe.local.response["http_status_code"] = status_code
    return

@frappe.whitelist(allow_guest=True, methods="POST")
def login(login_id, password):
    frappe.flags.ignore_csrf = True 
    '''API for user login
       args:Administrator
            login_id : username/email of the user
            password : user password'''
    try:
        login_manager = frappe.auth.LoginManager()
        login_manager.authenticate(user=login_id, pwd=password)
        user = frappe.get_doc("User", login_manager.user)
        login_manager.post_login()

    except frappe.exceptions.AuthenticationError as exception:
        frappe.log_error(frappe.get_traceback())
        return response(exception, {}, False, 417)

    generate_key = generate_keys(frappe.session.user)
    user = frappe.get_doc("User", frappe.session.user)
    roles1 = frappe.get_roles(frappe.session.user)
    roles = [p for p in roles1 if p != "All" and p != "Guest"]

    data = {
        "success_key": 1,
        "sid": frappe.session.sid,
        "api_key": user.api_key,
        "api_secret": generate_key,
        "user_id": user.username,
        "name": user.full_name,
        "user_type": user.user_type,
        "roles": roles,
    }
    return response("Authentication Success", data, True, 200)

def generate_keys(user):
    user_details = frappe.get_doc("User", user)
    api_secret = frappe.generate_hash(length=15)

    # If api key is not set, generate api key
    if not user_details.api_key:
        api_key = frappe.generate_hash(length=15)
        user_details.api_key = api_key

    # Store the api_secret and api_key in the database
    user_details.api_secret = api_secret
    user_details.save(ignore_permissions=True)

    return api_secret


@frappe.whitelist(allow_guest=True,methods="GET")
def get_todos():
    todos=frappe.get_all("ToDo",fields=['name','status','description','date'],order_by='modified desc')
    return todos

@frappe.whitelist(allow_guest=True)
def get_tododoc(name):
    try:
        todo_doc = frappe.get_doc("ToDo", name)
        if todo_doc:
            return response("Todo Detail", todo_doc, True, 200)
        else:
            return response("Todo Detail Not Found", [], True, 204)
    except Exception as exception:
        frappe.log_error(frappe.get_traceback(),f'{exception}')
        return response(exception, {}, False, 417)
    
@frappe.whitelist()
def create_tododoc():
    try:
        data = frappe.request.get_data(as_text=True)
        input = json.loads(data)
        todo_doc = frappe.new_doc("ToDo")
        for key in input:
            todo_doc.set(key, input[key])
        todo_doc.save()
        frappe.clear_messages()
        return response("Sub Dealer Sales Tracking created successfully", todo_doc, True, 201)
    except Exception as exception:
        frappe.log_error(frappe.get_traceback(),f'{exception}')
        return response(exception, {}, False, 417)

@frappe.whitelist()
def get_csrf_token_local():
    from frappe.sessions import get_csrf_token
    csrftoken=get_csrf_token()
    print(csrftoken,"========= csrf token ============")
    return csrftoken