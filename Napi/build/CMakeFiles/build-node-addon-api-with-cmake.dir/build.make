# CMAKE generated file: DO NOT EDIT!
# Generated by "MinGW Makefiles" Generator, CMake Version 3.27

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:

#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:

# Disable VCS-based implicit rules.
% : %,v

# Disable VCS-based implicit rules.
% : RCS/%

# Disable VCS-based implicit rules.
% : RCS/%,v

# Disable VCS-based implicit rules.
% : SCCS/s.%

# Disable VCS-based implicit rules.
% : s.%

.SUFFIXES: .hpux_make_needs_suffix_list

# Command-line flag to silence nested $(MAKE).
$(VERBOSE)MAKESILENT = -s

#Suppress display of executed commands.
$(VERBOSE).SILENT:

# A target that is always out of date.
cmake_force:
.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

SHELL = cmd.exe

# The CMake executable.
CMAKE_COMMAND = "C:\Program Files\CMake\bin\cmake.exe"

# The command to remove a file.
RM = "C:\Program Files\CMake\bin\cmake.exe" -E rm -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = C:\Users\tcnca\OneDrive\Desktop\Napi

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = C:\Users\tcnca\OneDrive\Desktop\Napi\build

# Include any dependencies generated for this target.
include CMakeFiles/build-node-addon-api-with-cmake.dir/depend.make
# Include any dependencies generated by the compiler for this target.
include CMakeFiles/build-node-addon-api-with-cmake.dir/compiler_depend.make

# Include the progress variables for this target.
include CMakeFiles/build-node-addon-api-with-cmake.dir/progress.make

# Include the compile flags for this target's objects.
include CMakeFiles/build-node-addon-api-with-cmake.dir/flags.make

CMakeFiles/build-node-addon-api-with-cmake.dir/hello.cc.obj: CMakeFiles/build-node-addon-api-with-cmake.dir/flags.make
CMakeFiles/build-node-addon-api-with-cmake.dir/hello.cc.obj: CMakeFiles/build-node-addon-api-with-cmake.dir/includes_CXX.rsp
CMakeFiles/build-node-addon-api-with-cmake.dir/hello.cc.obj: C:/Users/tcnca/OneDrive/Desktop/Napi/hello.cc
CMakeFiles/build-node-addon-api-with-cmake.dir/hello.cc.obj: CMakeFiles/build-node-addon-api-with-cmake.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green --progress-dir=C:\Users\tcnca\OneDrive\Desktop\Napi\build\CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object CMakeFiles/build-node-addon-api-with-cmake.dir/hello.cc.obj"
	C:\MinGW\bin\g++.exe $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/build-node-addon-api-with-cmake.dir/hello.cc.obj -MF CMakeFiles\build-node-addon-api-with-cmake.dir\hello.cc.obj.d -o CMakeFiles\build-node-addon-api-with-cmake.dir\hello.cc.obj -c C:\Users\tcnca\OneDrive\Desktop\Napi\hello.cc

CMakeFiles/build-node-addon-api-with-cmake.dir/hello.cc.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Preprocessing CXX source to CMakeFiles/build-node-addon-api-with-cmake.dir/hello.cc.i"
	C:\MinGW\bin\g++.exe $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E C:\Users\tcnca\OneDrive\Desktop\Napi\hello.cc > CMakeFiles\build-node-addon-api-with-cmake.dir\hello.cc.i

CMakeFiles/build-node-addon-api-with-cmake.dir/hello.cc.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Compiling CXX source to assembly CMakeFiles/build-node-addon-api-with-cmake.dir/hello.cc.s"
	C:\MinGW\bin\g++.exe $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S C:\Users\tcnca\OneDrive\Desktop\Napi\hello.cc -o CMakeFiles\build-node-addon-api-with-cmake.dir\hello.cc.s

# Object files for target build-node-addon-api-with-cmake
build__node__addon__api__with__cmake_OBJECTS = \
"CMakeFiles/build-node-addon-api-with-cmake.dir/hello.cc.obj"

# External object files for target build-node-addon-api-with-cmake
build__node__addon__api__with__cmake_EXTERNAL_OBJECTS =

build-node-addon-api-with-cmake.node: CMakeFiles/build-node-addon-api-with-cmake.dir/hello.cc.obj
build-node-addon-api-with-cmake.node: CMakeFiles/build-node-addon-api-with-cmake.dir/build.make
build-node-addon-api-with-cmake.node: CMakeFiles/build-node-addon-api-with-cmake.dir/linkLibs.rsp
build-node-addon-api-with-cmake.node: CMakeFiles/build-node-addon-api-with-cmake.dir/objects1.rsp
build-node-addon-api-with-cmake.node: CMakeFiles/build-node-addon-api-with-cmake.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green --bold --progress-dir=C:\Users\tcnca\OneDrive\Desktop\Napi\build\CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking CXX shared library build-node-addon-api-with-cmake.node"
	$(CMAKE_COMMAND) -E cmake_link_script CMakeFiles\build-node-addon-api-with-cmake.dir\link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
CMakeFiles/build-node-addon-api-with-cmake.dir/build: build-node-addon-api-with-cmake.node
.PHONY : CMakeFiles/build-node-addon-api-with-cmake.dir/build

CMakeFiles/build-node-addon-api-with-cmake.dir/clean:
	$(CMAKE_COMMAND) -P CMakeFiles\build-node-addon-api-with-cmake.dir\cmake_clean.cmake
.PHONY : CMakeFiles/build-node-addon-api-with-cmake.dir/clean

CMakeFiles/build-node-addon-api-with-cmake.dir/depend:
	$(CMAKE_COMMAND) -E cmake_depends "MinGW Makefiles" C:\Users\tcnca\OneDrive\Desktop\Napi C:\Users\tcnca\OneDrive\Desktop\Napi C:\Users\tcnca\OneDrive\Desktop\Napi\build C:\Users\tcnca\OneDrive\Desktop\Napi\build C:\Users\tcnca\OneDrive\Desktop\Napi\build\CMakeFiles\build-node-addon-api-with-cmake.dir\DependInfo.cmake "--color=$(COLOR)"
.PHONY : CMakeFiles/build-node-addon-api-with-cmake.dir/depend

