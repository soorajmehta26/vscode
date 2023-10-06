cmake_minimum_required(VERSION 3.12)
cmake_policy(SET CMP0042 NEW)
set (CMAKE_CXX_STANDARD 11)
project(opencvaddon)

# Set the OpenCV_DIR variable to the directory where OpenCV is installed
set(OpenCV_DIR "C:/opencv/build")

# Find the OpenCV package
find_package(OpenCV REQUIRED)
include_directories(${OpenCV_INCLUDE_DIRS})

# Create the Node.js addon target
add_library(opencvaddon SHARED opencv.cc)
set_target_properties(opencvaddon PROPERTIES PREFIX "" SUFFIX ".node")

# Include N-API wrappers
execute_process(COMMAND node -p "require('node-addon-api').include"
        WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
        OUTPUT_VARIABLE NODE_ADDON_API_DIR
        )
string(REGEX REPLACE "[\r\n\"]" "" NODE_ADDON_API_DIR ${NODE_ADDON_API_DIR})
target_include_directories(opencvaddon PRIVATE ${NODE_ADDON_API_DIR})

# Define NAPI_VERSION
add_definitions(-DNAPI_VERSION=3)

# Link the Node.js addon target with OpenCV
target_link_libraries(opencvaddon PRIVATE ${OpenCV_LIBS})
