package com.jenkins;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.Test;

import io.github.bonigarcia.wdm.WebDriverManager;

public class JenkinTesting {
	WebDriver driver;
	@Test
private void flipkart() {
	WebDriverManager.chromedriver().setup();
	driver = new ChromeDriver();
	driver.get("http:/flipkart.com");
	driver.quit();

}
}
