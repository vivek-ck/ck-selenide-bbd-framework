package com.cloudkaptan;

import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import static com.cloudkaptan.webPages.SalesForce.PageManager.*;
import com.codeborne.selenide.Configuration;
import com.codeborne.selenide.Selenide;

import static com.codeborne.selenide.Selenide.*;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.stream.IntStream;

import javax.imageio.ImageIO;

public class SecreenShotTesting {

    private long startTime;
    private long endTime;

    @BeforeClass
    public void browserSetup() {
        // Configuration.remote = "http://localhost:4444/";
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setBrowserName("chrome");
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--remote-allow-origins=*");
        options.addArguments("--disable-notifications");
        options.addArguments("--window-size=1280,720");
        options.addArguments("start-maximized");
        capabilities.setCapability(ChromeOptions.CAPABILITY, options);
        Configuration.browserCapabilities = capabilities;
        Configuration.reportsFolder = "test-result/reports";

        getScreenShot();

        startTime = System.currentTimeMillis();
    }

    @DataProvider
    public static Object[][] imageData() {
        return new Object[][] {
                { "HomePage.png", "HomePage.png", true },
                { "HomePage.png", "ActionBar.png", true },
                //{ "HomePage.png", "Assistant.png", true },
                { "HomePage.png", "Quarterly.png", true },
                // { "Leads.png", "ActionBar.png", false },
                // { "Leads.png", "Assistant.png", false },
                // { "Leads.png", "Quarterly.png", false },
        };
    }

    @Test(dataProvider = "imageData")
    public void graphicalUiTesting(String mainImageName, String subImageName, Boolean containsImage) {
        Assert.assertEquals(containsImage, imageContainsImageV2(mainImageName, subImageName));
    }

    public void getScreenShot() {
        open("https://cloudkaptanconsultancyse-3f-dev-ed.lightning.force.com/lightning/page/home");
        
        loginPage().login("saikat@cloudkaptan.com", "Welcome123");
        Selenide.sleep(5000);
        screenshot("HomePage");
        // homePage().clickOnLeadsTab();
        // Selenide.sleep(5000);
        // screenshot("Leads");
        Selenide.closeWindow();
    }

    public boolean imageContainsImageV2(String mainImageName, String subImageName) {
        System.out.println("MainImage: " + mainImageName + ", SubImage: " + subImageName);
        AtomicBoolean subImageFound = new AtomicBoolean(false);
        try {
            // Load the images
            BufferedImage mainImage = ImageIO.read(new File("test-result/reports/" + mainImageName));
            BufferedImage subImage = ImageIO.read(new File("test-result/reports/" + subImageName));

            // Convert images to grayscale
            final BufferedImage grayMainImage = convertToGrayscale(mainImage);
            final BufferedImage graySubImage = convertToGrayscale(subImage);

            // Get the dimensions of the images
            int mainWidth = mainImage.getWidth();
            int mainHeight = mainImage.getHeight();
            int subWidth = subImage.getWidth();
            int subHeight = subImage.getHeight();

            // Check if the sub-image is smaller than the main image
            if (subWidth > mainWidth || subHeight > mainHeight) {
                System.out.println("Sub-image is larger than the main image.");
                return false;
            }

            int threshold = 0; // Adjust this value to control the similarity threshold

            IntStream.range(0, mainHeight - subHeight + 1).parallel().forEach(y -> {
                for (int x = 0; x <= mainWidth - subWidth; x++) {
                    boolean match = true;
                    for (int subY = 0; subY < subHeight; subY += 2) {
                        for (int subX = 0; subX < subWidth; subX += 2) {
                            int mainRGB = grayMainImage.getRGB(x + subX, y + subY);
                            int subRGB = graySubImage.getRGB(subX, subY);
                            int delta = Math.abs(mainRGB - subRGB);
                            if (delta > threshold) {
                                match = false;
                                break;
                            }
                        }
                        if (!match) {
                            break;
                        }
                    }
                    if (match) {
                        System.out.println("Sub-image found at (" + x + "," + y + ")");
                        subImageFound.set(true);
                    }
                }
            });

        } catch (Exception e) {
            e.printStackTrace();
        }
        return subImageFound.get();
    }

    public BufferedImage convertToGrayscale(BufferedImage image) {
        int width = image.getWidth();
        int height = image.getHeight();
        BufferedImage grayscaleImage = new BufferedImage(width, height, BufferedImage.TYPE_BYTE_GRAY);
        Graphics g = grayscaleImage.getGraphics();
        g.drawImage(image, 0, 0, null);
        g.dispose();
        return grayscaleImage;
    }

    @AfterClass
    public void tearDown() {
        endTime = System.currentTimeMillis();
        System.out.println(endTime - startTime);
    }

}
