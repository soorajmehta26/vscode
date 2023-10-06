#include <napi.h>
 #include <opencv2/opencv.hpp>

Napi::Value LoadAndShowImage(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  // Check if an argument (image path) is provided
  if (info.Length() < 1 || !info[0].IsString()) {
    Napi::TypeError::New(env, "Invalid arguments. Expected a string (image path).").ThrowAsJavaScriptException();
    return env.Undefined();
  }

  // Convert the JavaScript string to a C++ string
  std::string imagePath = info[0].As<Napi::String>().Utf8Value();

  //Load the image using OpenCV
  cv::Mat image = cv::imread(imagePath);
  if (image.empty()) {
    Napi::TypeError::New(env, "Failed to open image.").ThrowAsJavaScriptException();
    return env.Undefined();
  }

  //Show the image using OpenCV (you may need to implement your own image display logic here)
  cv::imshow("My Image", image);
  cv::waitKey(0);

 return env.Undefined();

 
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "loadAndShowImage"), Napi::Function::New(env, LoadAndShowImage));
  return exports;
}

NODE_API_MODULE(opencvaddon, Init)
