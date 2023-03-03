package com.cloudkaptan;

import org.testng.annotations.Test;

import static com.cloudkaptan.utils.PropertiesStorage.*;
import com.cloudkaptan.utils.PropertiesStorage;
import static com.codeborne.selenide.Selenide.*;

public class test {
    @Test
    public void test() {
        loadSettings();
        System.out.println(new PropertiesStorage());
    }
}
