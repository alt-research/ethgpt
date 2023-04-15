info.Main.Version)
	}
	// Check if any of the dependencies are from our repo.
	for _, dep := range info.Deps {
		if strings.HasPrefix(dep.Path, ourPath) {
			return fmt.Sprintf("%s%s", version, dep.Version)
		}
	}
	// No dependencies from our repo, fallback to hardcoded values.
	return params.VersionWithMeta
}

// buildInfoVCS returns the VCS information for the given build info.
func buildInfoVCS(info *debug.BuildInfo) (VCSInfo, bool ## Package version

The `version` package provides a function to retrieve the version of the current package. It uses the `debug.BuildInfo` struct to get information about the current build, including the module path and version.

### `GetVersion() string`

`GetVersion()` returns a string containing the version of the current package. It first retrieves the `debug.BuildInfo` struct using `debug.ReadBuildInfo()`. It then finds the module that corresponds to the current package using `findModule()`. If the module is not found, it falls back to a hardcoded version string. Finally, it returns a string containing the module path and version, and if the package was replaced by something else, it also notes that.

### `findModule(info *debug.BuildInfo, path string) *debug.Module`

`findModule()` is a helper function used by `GetVersion()` to find the module that corresponds to the current package. It takes a `debug.BuildInfo` struct and a module path as arguments, and returns a pointer to the corresponding `debug.Module` struct. It first checks if the main module corresponds to the current package, and if not, it iterates over the dependencies to find the module that matches the given path. If no module is found, it returns `nil`.