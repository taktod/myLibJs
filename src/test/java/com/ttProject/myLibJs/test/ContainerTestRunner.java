package com.ttProject.myLibJs.test;

/**
 * ちょっとつくってみよう
 * @author taktod
 */
public class ContainerTestRunner extends ScriptTestRunnerBase {
	public ContainerTestRunner(Class<?> testClass) {
		super(testClass, "test/container.js");
	}
}
