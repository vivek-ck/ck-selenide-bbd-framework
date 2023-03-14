package com.cloudkaptan.base;

import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.DesiredCapabilities;

import com.codeborne.selenide.Configuration;
import com.codeborne.selenide.Selenide;

import io.cucumber.java.AfterAll;
import io.cucumber.java.BeforeAll;

public class BaseHooks {
    @BeforeAll
    public static void setUp() {
        Configuration.remote = "http://localhost:4444/";
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setBrowserName("chrome");
        capabilities.setVersion("110.0");
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--remote-allow-origins=*");
        options.addArguments("--disable-notifications");
        capabilities.setCapability(ChromeOptions.CAPABILITY, options);
        Configuration.browserCapabilities = capabilities;
    }

    @AfterAll
    public static void destroyDriver() {
        
    }
}
