package com.cloudkaptan.salesForce;

import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import com.codeborne.selenide.Configuration;

import io.cucumber.testng.AbstractTestNGCucumberTests;
import io.cucumber.testng.CucumberOptions;
import io.github.bonigarcia.wdm.WebDriverManager;

import static com.codeborne.selenide.Selenide.*;


@CucumberOptions(
    monochrome = true,
    features = {"src/main/java/com/cloudkaptan/features/salesForce/"},
    glue={"com.cloudkaptan.stepDefs.salesForce"},
    plugin = {"pretty", "html:target/cucumber-reports",
    "json:target/cucumber.json"}
)
public class TestRunner extends AbstractTestNGCucumberTests {
    @Override
    @DataProvider(parallel = true)
    public Object[][] scenarios() {
        return super.scenarios();
    }

    @BeforeClass
    public void setUp() {
        // Configuration.remote = "http://localhost:4444/";
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setBrowserName("chrome");
        capabilities.setVersion("110.0");
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--remote-allow-origins=*");
        capabilities.setCapability(ChromeOptions.CAPABILITY, options);
        Configuration.browserCapabilities = capabilities;
    }
}
