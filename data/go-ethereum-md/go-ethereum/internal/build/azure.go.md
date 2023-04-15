## Package build

The `build` package provides functions for uploading, listing, and deleting files from an Azure Blob Storage container.

### AzureBlobstoreConfig

`AzureBlobstoreConfig` is a struct that contains the authentication and configuration data required by the Azure SDK to interact with a specific container in the blobstore. It has the following fields:

- `Account`: Account name to authorize API requests with.
- `Token`: Access token for the above account.
- `Container`: Blob container to upload files into.

### AzureBlobstoreUpload

`AzureBlobstoreUpload` uploads a local file to the Azure Blob Storage. This method assumes a maximum file size of 64MB (Azure limitation). Larger files will need a multi-API call approach implemented. It has the following parameters:

- `path`: The path of the local file to upload.
- `name`: The name of the file to upload to the blobstore.
- `config`: An instance of `AzureBlobstoreConfig` containing the authentication and configuration data required to interact with the blobstore.

### AzureBlobstoreList

`AzureBlobstoreList` lists all the files contained within an Azure blobstore. It has the following parameter:

- `config`: An instance of `AzureBlobstoreConfig` containing the authentication and configuration data required to interact with the blobstore.

It returns a slice of `azblob.BlobItemInternal` and an error.

### AzureBlobstoreDelete

`AzureBlobstoreDelete` iterates over a list of files to delete and removes them from the blobstore. It has the following parameters:

- `config`: An instance of `AzureBlobstoreConfig` containing the authentication and configuration data required to interact with the blobstore.
- `blobs`: A slice of `azblob.BlobItemInternal` representing the files to delete.

It returns an error.

Note: If the `DryRunFlag` is set to true, the functions will not perform any actual operations, but will only print the operations that would have been performed. The `DeleteBlobs` function is responsible for deleting blobs from an Azure Blob Storage container. It takes in a `config` parameter which contains the account name, token, and container name. It also takes in a `blobs` parameter which is a slice of `azblob.BlobItem` structs that represent the blobs to be deleted.

The function first checks if the `blobs` slice is empty. If it is, the function returns `nil` indicating that there are no blobs to delete.

If the `blobs` slice is not empty, the function creates an authenticated client against the Azure cloud using the account name and token provided in the `config` parameter. It then creates a new `azblob.ContainerClient` using the account name, container name, and the authenticated client.

The function then iterates over the `blobs` slice and deletes each blob using the `azblob.BlockBlobClient` and the `Delete` method. If the deletion is successful, the function prints a message indicating the name of the deleted blob and its last modified date.

Finally, the function returns `nil` if all blobs were deleted successfully, or an error if any deletion operation failed.