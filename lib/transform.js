var transform = {};

transform.accountInfo = function(account_response){

    var transform = {};
    transform.name = account_response.name;
    transform.email = account_response.login;
    transform.avatar_url = account_response.avatar_url;
    transform.created_date = new Date(account_response.created_at);
    transform.modified_date = new Date(account_response.modified_at);
    transform.id = account_response.id;
    transform._raw = account_response;
    return transform;
};

transform.checkQuota = function (quota_response){
    var transform = {};
    transform.total_bytes = quota_response.space_amount; //total space allocated in bytes
    transform.used_bytes = quota_response.space_used; //bytes used.
    transform.limits= {
        upload_size : quota_response.max_upload_size
    }
    transform._raw = quota_response;
    return transform;
};

transform.createFile = function(create_response){
    var transform = {};
    transform.success = true;
    transform._raw = create_response;
    return transform;
};

transform.deleteFile = function(deletion_response){
    var transform = {};
    transform.success = true;
    transform._raw = deletion_response;
    return transform;
};

transform.downloadFile = function(download_response){
    var transform = {};
    //TODO: figure out what the download file response should be.
    transform.data = true;
    transform.headers = true;
    transform._raw = download_response;
    return transform;
};

transform.getFileInformation = function (file_response){
    var transform = {};
    transform.is_file = true;
    transform.is_folder = false;
    transform.etag = file_response.etag;
    transform.identifier = file_response.id;
    transform.parent_identifier = file_response.parent.id;
    transform.mimetype = ""
    transform.created_date = new Date(file_response.created_at);
    transform.modified_date = new Date(file_response.modified_at);
    transform.name = file_response.name;
    transform.description = file_response.description;
    //transform.extension = file_response.name.split('.')
    transform.checksum = file_response.sha1;
    transform.file_size = file_response.size;
    transform._raw = file_response;
    return transform;
};

transform.createFolder = function(create_response){
    var transform = {};
    transform.success = true;
    transform._raw = create_response;
    return transform;
};

transform.deleteFolder = function(deletion_response){
    var transform = {};
    transform.success = true;
    transform._raw = deletion_response;
    return transform;
};


transform.getFolderInformation = function(folder_response){
    var transform = {};
    transform.is_file = false;
    transform.is_folder = true;
    transform.etag = folder_response.etag;
    transform.identifier = folder_response.id;
    transform.parent_identifier = folder_response.parent.id;
    transform.created_date = new Date(folder_response.created_at);
    transform.modified_date = new Date(folder_response.modified_at);
    transform.name = folder_response.name;
    transform.description = folder_response.description;
    transform._raw = folder_response;
    return transform;
};


transform.retrieveFolderItems = function(items_response){
    /*
     "total_count": 0,
     "entries": [],
     "offset": 0,
     "limit": 100,
     "order": [
     {
     "by": "type",
     "direction": "ASC"
     },
     {
     "by": "name",
     "direction": "ASC"
     }
     ]
     * */

    var transform = {};
    transform.total_items = items_response.total_count;
    transform.content = items_response.entries.map(function(current_item){
        if(current_item.type == "file"){
            return parseFileInformation(current_item);
        }
        else{
            return parseFolderInformation(current_item);
        }
    });
    return transform;
};

module.exports = transform;
