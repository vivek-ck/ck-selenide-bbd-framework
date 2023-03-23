package com.cloudkaptan.salesForce;

import org.junit.runner.RunWith;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import com.codeborne.selenide.Configuration;

import io.cucumber.java.BeforeAll;
import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import io.cucumber.testng.AbstractTestNGCucumberTests;
//import io.cucumber.testng.CucumberOptions;
import io.github.bonigarcia.wdm.WebDriverManager;

import static com.codeborne.selenide.Selenide.*;

// @CucumberOptions(monochrome = true, features = { "src/main/java/com/cloudkaptan/features/salesForce/" }, glue = {
//         "com.cloudkaptan.stepDefs.salesForce", "com.cloudkaptan.base" }, plugin = { "pretty",
//                 "html:target/cucumber-reports.html",
//                 "json:target/cucumber.json" })

@RunWith(Cucumber.class)
@CucumberOptions(
monochrome = true,
plugin = { "pretty", "html:target/cucumber-reports.html",
"json:target/cucumber.json" },
features = { "src/main/java/com/cloudkaptan/features/salesForce" },
glue = { "com.cloudkaptan.stepDefs.salesForce", "com.cloudkaptan.base" })

public class TestRunner extends AbstractTestNGCucumberTests {
    @Override
    @DataProvider(parallel = true)
    public Object[][] scenarios() {
        return super.scenarios();
    }
}