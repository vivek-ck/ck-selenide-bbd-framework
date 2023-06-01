package com.cloudkaptan.base;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.logging.Level;

import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.logging.LogType;
import org.openqa.selenium.logging.LoggingPreferences;
import org.openqa.selenium.remote.DesiredCapabilities;

import com.cloudkaptan.utils.ApiHelper;
import com.codeborne.selenide.Configuration;
import com.codeborne.selenide.Selenide;

import io.cucumber.java.After;
import io.cucumber.java.AfterAll;
import io.cucumber.java.BeforeAll;
import io.cucumber.java.Scenario;
import net.masterthought.cucumber.ReportBuilder;

public class BaseHooks {
    @BeforeAll
    public static void setUp() {
        // Configuration.remote = "http://localhost:4444/";
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setBrowserName("chrome");
        // capabilities.setVersion("110.0");
        ChromeOptions options = new ChromeOptions();
        LoggingPreferences logPrefs = new LoggingPreferences();
        logPrefs.enable(LogType.BROWSER, Level.ALL);
        logPrefs.enable(LogType.PERFORMANCE, Level.ALL);
        capabilities.setCapability("goog:loggingPrefs", logPrefs);
        options.addArguments("--remote-allow-origins=*");
        options.addArguments("--disable-notifications");
        capabilities.setCapability(ChromeOptions.CAPABILITY, options);
        Configuration.browserCapabilities = capabilities;

        /////// Fetch TestRail Tests//////////

        ApiHelper.getTestsFromRuns("17");
    }

    @After
    public void publishResultsToTestRail(Scenario scenario) {
        for (String tagName : scenario.getSourceTagNames()) {
            if (tagName.toLowerCase().contains("testrail")) {
                String[] res = tagName.split("_");
                String caseId = res[1];
                Properties prop = new Properties();

                try (InputStream file = new FileInputStream("src/resources/TestRail/TestRailTestMap.properties")) {
                    prop.load(file);
                } catch (Exception e) {
                    e.printStackTrace();
                }

                String testId = prop.getProperty(caseId);

                ApiHelper.sendTestResultsToTest(testId, scenario.isFailed() ? 5 : 1,
                        scenario.isFailed() ? "Case Failed" : "Case Passed");
            }
        }

        Selenide.closeWebDriver();
    }

}
