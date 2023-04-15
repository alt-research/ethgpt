## Package build

The `build` package provides functions for building and rendering templates, running Git commands, and uploading files to a remote host using the sftp command line tool.

### Variables

- `DryRunFlag`: a boolean flag that, when set to true, indicates that the commands should not be executed.

### Functions

- `MustRun(cmd *exec.Cmd)`: executes the given command and exits the host process for any error.
- `printArgs(args []string) string`: returns a string representation of the given command arguments.
- `MustRunCommand(cmd string, args ...string)`: executes the given command and exits the host process for any error.
- `RunGit(args ...string) string`: runs a git subcommand and returns its output. The command must complete successfully.
- `readGitFile(file string) string`: returns the content of a file in the `.git` directory.
- `Render(templateFile, outputFile string, outputPerm os.FileMode, x interface{})`: renders the given template file into `outputFile`.
- `RenderString(templateContent, outputFile string, outputPerm os.FileMode, x interface{})`: renders the given template string into `outputFile`.
- `render(tpl *template.Template, outputFile string, outputPerm os.FileMode, x interface{})`: renders the given template into `outputFile`.
- `UploadSFTP(identityFile, user, host, remoteDir string, files ...string)`: uploads files to a remote host using the sftp command line tool. The destination host may be specified either as `[user@]host[:port]` or as a URI in the form `sftp://[user@]host[:port]`.

### Notes

This package is part of the go-ethereum library, which is free software distributed under the terms of the GNU Lesser General Public License. ## Function: sftpUpload

The `sftpUpload` function uploads files to a remote server using the Secure File Transfer Protocol (SFTP). It takes in three parameters: `identityFile` (string), `host` (string), `dir` (string), and `files` ([]string). 

The `identityFile` parameter is an optional string that specifies the path to the identity file to use for authentication. The `host` parameter is a string that specifies the hostname or IP address of the remote server. The `dir` parameter is a string that specifies the remote directory to upload the files to. The `files` parameter is a slice of strings that specifies the local files to upload.

The function creates an `sftp` command and sets its standard error output to the system's standard error output. If an `identityFile` is specified, it is added to the command's arguments. The `host` parameter is also added to the command's arguments. If the `DryRunFlag` is set to true, the function returns without executing the command.

The function creates a pipe for the command's standard input and output. It then starts the command and creates a multi-writer that writes to the command's standard input and the system's standard output. The function then iterates through the `files` slice and writes a `put` command to the command's standard input for each file. The `put` command uploads the file to the remote server's `dir` directory with the same filename as the local file. After all files have been uploaded, the function writes an `exit` command to the command's standard input to terminate the SFTP session.

The function creates a goroutine that scans the command's standard output for the `sftp> exit` string. If the string is found, the function waits for 500 milliseconds and then kills the SFTP process. The function then closes the command's standard input and waits for the command to exit. If the `aborted` flag is set to true, the function returns nil. Otherwise, it returns the error returned by the command.

## Function: FindMainPackages

The `FindMainPackages` function finds all `main` packages in the given directory and returns their package paths. It takes in one parameter: `dir` (string).

The function reads the contents of the `dir` directory and returns an error if it fails to do so. It then iterates through the directory's contents and parses each subdirectory as a Go package. If a package's name is `main`, the function constructs the package's path and appends it to the `commands` slice. The function then returns the `commands` slice.