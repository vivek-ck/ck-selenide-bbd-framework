package com.cloudkaptan.salesForce;

import org.junit.runner.RunWith;
import org.testng.annotations.DataProvider;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import io.cucumber.testng.AbstractTestNGCucumberTests;

@RunWith(Cucumber.class)
@CucumberOptions(
publish = true, 
stepNotifications = true, 
plugin = {"pretty", "html:target/cucumber-reports.html", "json:target/cucumber.json" },
features = { "src/main/java/com/cloudkaptan/features/salesForce" },
glue = { "com.cloudkaptan.stepDefs.salesForce", "com.cloudkaptan.base" })

public class TestRunner{
    // @Override
    // @DataProvider(parallel = true)
    // public Object[][] scenarios() {
    //     return super.scenarios();
    // }
}