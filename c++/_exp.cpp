#include <opencv2/opencv.hpp>
#include <opencv2/ml/ml.hpp>
#include <vector>
#include <iostream>
#include <algorithm>

using namespace cv;
using namespace std;

// Function to calculate HSV from RGB values
Vec3f rgb_to_hsv(Vec3b rgb)
{
    float r = rgb[0] / 255.0f;
    float g = rgb[1] / 255.0f;
    float b = rgb[2] / 255.0f;

    float cmax = max(r, max(g, b)); // maximum of r, g, b
    float cmin = min(r, min(g, b)); // minimum of r, g, b
    float diff = cmax - cmin;       // diff of cmax and cmin.

    float h = 0, s = 0, v = 0;

    if (cmax == cmin)
    {
        h = 0;
    }
    else if (cmax == r)
    {
        h = fmod(60 * ((g - b) / diff) + 360, 360);
    }
    else if (cmax == g)
    {
        h = fmod(60 * ((b - r) / diff) + 120, 360);
    }
    else if (cmax == b)
    {
        h = fmod(60 * ((r - g) / diff) + 240, 360);
    }

    if (cmax == 0)
    {
        s = 0;
    }
    else
    {
        s = (diff / cmax) * 100;
    }

    v = cmax * 100;

    return Vec3f(h, s, v);
}

// Function to convert a list of RGB pixels to HSV format
vector<Vec3f> rgb_list_to_hsv_list(const vector<Vec3b> &rgbList)
{
    vector<Vec3f> hsvList;

    for (const Vec3b &pixel : rgbList)
    {
        Vec3f hsv = rgb_to_hsv(pixel);
        hsv[0] = (hsv[0] / 360) * 180;
        hsv[1] = (hsv[1] / 100) * 255;
        hsv[2] = (hsv[2] / 100) * 255;
        hsvList.push_back(hsv);
    }

    return hsvList;
}
// Function to perform colorization
void colorizeImage(const Mat &inputImage, const vector<Vec3b> &userColorPalette, const string &outputFileName)
{
    Mat imgData = inputImage.clone();
    Mat img;
    cvtColor(imgData, img, COLOR_BGR2RGB);

    // Convert 2D Mat into 1D vector of pixels
    vector<Vec3b> pixelList;
    for (int i = 0; i < img.rows; i++)
    {
        for (int j = 0; j < img.cols; j++)
        {
            pixelList.push_back(img.at<Vec3b>(i, j));
        }
    }
    cout << "inoutimg" << pixelList.size() << endl;
    // Perform k-means clustering
    int num_clusters = 16; // Adjust as needed
    cv::TermCriteria term_criteria(cv::TermCriteria::EPS + cv::TermCriteria::COUNT, 100, 0.2);
    cv::Mat samples(pixelList.size(), 3, CV_32F);
    for (int i = 0; i < pixelList.size(); ++i)
    {
        samples.at<float>(i, 0) = pixelList[i][0];
        samples.at<float>(i, 1) = pixelList[i][1];
        samples.at<float>(i, 2) = pixelList[i][2];
    }

    Mat predicted_list;
    vector<Vec3b> cluster_centroids;
    cv::kmeans(samples, num_clusters, predicted_list, term_criteria, 1, cv::KMEANS_PP_CENTERS, cluster_centroids);

    std::cout << "cluster_centroids : " << cluster_centroids.size() << std::endl;

    // Printing cluster centroids for image colors
    std::cout << "\nImage Colors:" << std::endl;
    for (int i = 0; i < cluster_centroids.size(); ++i)
    {
        const cv::Vec3b &centroid = cluster_centroids[i];

        float b = centroid[0]; // Blue channel value
        float g = centroid[1]; // Green channel value
        float r = centroid[2]; // Red channel value

        std::cout << i << ": \x1b[38;2;" << int(b) << ";" << int(g) << ";" << int(r) << "mKMEANS\x1b[0m "
                  << int(b) << " " << int(g) << " " << int(r) << std::endl;
        cluster_centroids[i] = centroid;
    }

    // Printing cluster centroids for user colors
    std::cout << "\nUser Color(s):" << std::endl;
    for (int i = 0; i < userColorPalette.size(); ++i)
    {
        const cv::Vec3b &centroid = userColorPalette[i];
        std::cout << i << ": \x1b[38;2;" << int(centroid[0]) << ";" << int(centroid[1]) << ";" << int(centroid[2]) << "mKMEANS\x1b[0m "
                  << int(centroid[0]) << " " << int(centroid[1]) << " " << int(centroid[2]) << std::endl;
    }

    cv::cvtColor(imgData, img, cv::COLOR_BGR2HSV);

    // Convert the 2D Mat into a 1D vector of pixels
    std::vector<cv::Vec3b> pixel_list;
    for (int i = 0; i < img.rows; ++i)
    {
        for (int j = 0; j < img.cols; ++j)
        {
            pixel_list.push_back(img.at<cv::Vec3b>(i, j));
        }
    }
    // cout<<"cluster_centroid"<< cluster_centroids<<endl;

    vector<Vec3f> hsv_image_colors = rgb_list_to_hsv_list(cluster_centroids);
    vector<Vec3f> hsv_user_colors = rgb_list_to_hsv_list(userColorPalette);

    cout << "hsv_image_colors:" << endl;
    for (const Vec3f &hsv : hsv_image_colors)
    {
        cout << "H: " << hsv[0] << " S: " << hsv[1] << " V: " << hsv[2] << endl;
    }

    cout << "hsv_user_colors:" << endl;
    for (const Vec3f &hsv : hsv_user_colors)
    {
        cout << "H: " << hsv[0] << " S: " << hsv[1] << " V: " << hsv[2] << endl;
    }

    // Map colors based on hue distances or use a base color
    map<int, int> color_map;
    color_map[0] = 0;
    Vec3f hsv_cmp_img_val = hsv_image_colors[0];
    Vec3f hsv_cmp_user_val = hsv_user_colors[0];

    for (int inx = 1; inx < hsv_image_colors.size(); ++inx)
    {
        int flag = 0;
        Vec3f hsv_img_val = hsv_image_colors[inx];
        float img_dist = abs(hsv_img_val[0] - hsv_cmp_img_val[0]);

        for (int jnx = 1; jnx < hsv_user_colors.size(); ++jnx)
        {
            Vec3f hsv_user_val = hsv_user_colors[jnx];
            float user_dist = abs(hsv_user_val[0] - hsv_cmp_user_val[0]);

            if (abs(img_dist - user_dist) < 1.0f)
            {
                flag = 1;
                color_map[inx] = jnx;
                break;
            }
        }

        if (flag == 0)
        {
            color_map[inx] = 0;
        }
    }

    // Print color map
    cout << "\ncolor map:" << endl;
    for (const auto &entry : color_map)
    {
        cout << entry.first << ": " << entry.second << endl;
    }

    vector<Vec3b> new_pixel_list;

    // Iterate through the pixel list
    for (int inx = 0; inx < pixel_list.size(); ++inx)
    {
        // Current pixel value
        Vec3b pixel = pixel_list[inx];
        // cout<<"hererererererer"<<predicted_list[inx]<<endl;
        // Get which cluster centroid the particular pixel belongs to
        Vec3f new_pixel = hsv_user_colors[color_map[predicted_list.at<float>(inx, 0)]];

        float hue = new_pixel[0];
        float sat = new_pixel[1];
        float val = new_pixel[2];

        // Update the pixel values based on the mapping
        pixel[0] = static_cast<uchar>(hue);
        pixel[1] = static_cast<uchar>((pixel[1] / 255.0f) * sat);
        pixel[2] = static_cast<uchar>((pixel[2] / 255.0f) * val);

        // Add the modified pixel to the new pixel list
        new_pixel_list.push_back(pixel);
    }

    int index = 0;
    for (int y = 0; y < img.rows; ++y)
    {
        for (int x = 0; x < img.cols; ++x)
        {
            Vec3b &pixel = img.at<Vec3b>(y, x);

            // Update the pixel values from new_pixel_list
            pixel[0] = new_pixel_list[index][0];
            pixel[1] = new_pixel_list[index][1];
            pixel[2] = new_pixel_list[index][2];
            index++;
        }
    }
    cvtColor(img, img, cv::COLOR_HSV2BGR);

    Mat final_data(img.size(), img.type());
    Mat channels[3];

    split(img, channels);

    if (img.channels() == 4)
    {
        Mat alpha = channels[3];
        alpha.copyTo(final_data.col(3));
    }

    merge(channels, 3, final_data);

    imwrite(outputFileName, final_data);
}

int main()
{
    // User-defined color palette
    vector<Vec3b> userColorPalette = {
        Vec3b(255, 0, 0), // Red
        Vec3b(0, 255, 0), // Yellow
        Vec3b(0, 0, 255)  // Blue
    };

    // Shuffle the user colors randomly
    random_shuffle(userColorPalette.begin(), userColorPalette.end());

    // Load the image
    Mat inputImage = imread("C:/Users/tcnca/Downloads/pngColorizer/pngColorizer/deer.png", IMREAD_UNCHANGED);

    if (inputImage.empty())
    {
        cerr << "Failed to load the image." << endl;
        return 1;
    }

    // Perform colorization and save the result
    colorizeImage(inputImage, userColorPalette, "colorized-deer.png");

    return 0;
}
