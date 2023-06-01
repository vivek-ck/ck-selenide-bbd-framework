package com.cloudkaptan;

import static com.cloudkaptan.utils.NetworkLogs.filteredLogs;
import static com.cloudkaptan.utils.NetworkLogs.getLogs;
import static com.cloudkaptan.utils.NetworkLogs.urlDecodeData;
import static com.cloudkaptan.webPages.SalesForce.PageManager.leadsPage;
import static com.cloudkaptan.webPages.SalesForce.PageManager.loginPage;
import static com.codeborne.selenide.Selenide.open;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.logging.LogEntries;
import org.openqa.selenium.logging.LogEntry;
import org.openqa.selenium.logging.LogType;
import org.openqa.selenium.logging.LoggingPreferences;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import com.codeborne.selenide.Configuration;
import com.codeborne.selenide.Selenide;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;

public class BrowserLogTester {

    Logger logger = Logger.getLogger(BrowserLogTester.class.getName());

    @BeforeClass
    public void browserSetup() {
        // Configuration.remote = "http://localhost:4444/";
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setBrowserName("chrome");
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--remote-allow-origins=*");
        options.addArguments("--disable-notifications");
        options.addArguments("start-maximized");
        LoggingPreferences logPrefs = new LoggingPreferences();
        logPrefs.enable(LogType.BROWSER, Level.ALL);
        logPrefs.enable(LogType.PERFORMANCE, Level.ALL);
        capabilities.setCapability("goog:loggingPrefs", logPrefs);
        capabilities.setCapability(ChromeOptions.CAPABILITY, options);
        Configuration.browserCapabilities = capabilities;
    }

    void printLog(LogEntries entries) {
        for (LogEntry entry : entries) {
            System.out.println("\n\n Logs:");
            System.out.println(entry);
        }
      }

    @Test
    public void fetchBrowserLogs() {
        open("https://cloudkaptanconsultancyse-3f-dev-ed.lightning.force.com/lightning/page/home");
        loginPage()
            .login("saikat@cloudkaptan.com", "Welcome1234");
        Selenide.sleep(5000);
        leadsPage()
            .clickOnLeadsTab()
            .initiateLead()
            .createLead("Mr.", "Biswas", "CK", "");
        List<String> logs = getLogs(LogType.PERFORMANCE);

        List<JsonNode> filteredLogs = filteredLogs("createRecord=1", logs);
        List<JsonNode> decodedLogs = filteredLogs.stream()
            .map(log -> {
                try {
                    return urlDecodeData(log, "/message/params/request/postData");
                } catch (UnsupportedEncodingException | JsonProcessingException
                        | IllegalArgumentException e) {
                    e.printStackTrace();
                    return null;
                }
            })
            .toList();

        for(JsonNode decodedLog: decodedLogs) {
            Assert.assertEquals(decodedLog.at("/actions/0/params/recordInput/fields/LastName").asText() , "Biswas");
            Assert.assertEquals(decodedLog.at("/actions/0/params/recordInput/fields/Company").asText() , "CK");
            Assert.assertEquals(decodedLog.at("/actions/0/params/recordInput/fields/Salutation").asText(), "Mr.");
        }
    }
}
