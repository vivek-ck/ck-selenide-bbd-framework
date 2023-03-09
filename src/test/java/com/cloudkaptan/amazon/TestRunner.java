package com.cloudkaptan.amazon;

import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.DataProvider;

import com.codeborne.selenide.Configuration;

import io.cucumber.testng.AbstractTestNGCucumberTests;
import io.cucumber.testng.CucumberOptions;

@CucumberOptions(monochrome = true, features = { "src/main/java/com/cloudkaptan/features/amazon/" }, glue = {
        "com.cloudkaptan.stepDefs.amazon" }, plugin = { "pretty", "html:target/cucumber-reports",
                "json:target/cucumber.json" })
public class TestRunner extends AbstractTestNGCucumberTests {
    @Override
    @DataProvider(parallel = true)
    public Object[][] scenarios() {
        return super.scenarios();
    }

    @BeforeClass
    public void setUp() {
    Configuration.remote = "http://localhost:4444/wd/hub";
    DesiredCapabilities capabilities = new DesiredCapabilities();
    capabilities.setBrowserName("chrome");
    Configuration.browserCapabilities = capabilities;
    }
}
