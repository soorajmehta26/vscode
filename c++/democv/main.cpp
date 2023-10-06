#include <opencv2/opencv.hpp>
#include <iostream>

int main() {
    cv::Mat image = cv::imread("C:/Users/tcnca/OneDrive/Desktop/vscode/c++/democv/your_image.jpg");
    if (image.empty()) {
        std::cerr << "Failed to open image." << std::endl;
        return 1;
    }

    cv::imshow("My Image", image);
    cv::waitKey(0);

    return 0;
}
