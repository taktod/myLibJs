package com.ttProject.myLibJs.test;

/**
 * ちょっとつくってみよう
 * @author taktod
 */
public class ScriptTestsRunner extends ScriptTestRunnerBase {
	public ScriptTestsRunner(Class<?> testClass) {
		super(testClass, "test/test.js");
	}
}
