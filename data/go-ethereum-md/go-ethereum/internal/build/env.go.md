## Package build

The `build` package provides functionality for gathering metadata about the build environment, such as Git commit hash, branch, and tag, build number, and whether the build is a pull request or a cron job.

### Environment

The `Environment` struct contains metadata provided by the build environment, including whether the build is running on a CI system, the name of the environment, the name of the GitHub repository, Git commit hash, date, branch, tag, build number, and whether the build is a pull request or a cron job.

### Env

The `Env` function returns metadata about the current CI environment, falling back to `LocalEnv` if not running on CI. It checks for the presence of environment variables such as `CI` and `TRAVIS` or `APPVEYOR` to determine the current environment.

### LocalEnv

The `LocalEnv` function returns build environment metadata gathered from Git. It creates an `Environment` struct with the name "local" and populates the Git commit hash, date, branch, and tag fields by running Git commands. 

### GitCommitFlag

The `GitCommitFlag` flag overrides the Git commit hash embedded into executables.

### GitBranchFlag

The `GitBranchFlag` flag overrides the Git branch being built.

### GitTagFlag

The `GitTagFlag` flag overrides the Git tag being built.

### BuildnumFlag

The `BuildnumFlag` flag overrides the CI build number.

### PullRequestFlag

The `PullRequestFlag` flag overrides the pull request status of the build.

### CronJobFlag

The `CronJobFlag` flag overrides the cron job status of the build. ## Documentation for Git Environment Functions

The `gitenv` package contains functions for retrieving information about the Git environment, such as the commit hash, branch, and tag.

### `type Environment struct`

The `Environment` struct represents the Git environment and contains the following fields:

- `Commit` (string): the commit hash
- `Branch` (string): the branch name
- `Tag` (string): the tag name
- `Date` (string): the commit date
- `Buildnum` (string): the build number
- `IsPullRequest` (bool): whether the build is a pull request
- `IsCronJob` (bool): whether the build is a cron job

### `func Env() Environment`

The `Env` function returns an `Environment` struct with the Git environment information for the current repository.

### `func LocalEnv() Environment`

The `LocalEnv` function returns an `Environment` struct with the Git environment information for the current repository, but only if the repository is local (i.e. not a remote repository).

### `func applyEnvFlags(env Environment) Environment`

The `applyEnvFlags` function applies any Git environment flags that were set using the `flag` package. It takes an `Environment` struct as input and returns an updated `Environment` struct with the flag values applied.

### `func firstLine(s string) string`

The `firstLine` function returns the first line of a string.

### `func getDate(commit string) string`

The `getDate` function takes a commit hash as input and returns the commit date in the format "20060102". It uses the `RunGit` function to run the `git show` command and extract the commit date.

### `func readGitFile(file string) string`

The `readGitFile` function takes a file path as input and returns the contents of the file in the Git repository. It uses the `RunGit` function to run the `git show` command and extract the file contents.

### `func RunGit(args ...string) string`

The `RunGit` function takes a list of command-line arguments as input and runs the `git` command with those arguments. It returns the output of the command as a string.