package com.ttProject.myLibJs.test;

/**
 * ちょっとつくってみよう
 * @author taktod
 */
public class ScriptTestRunner extends ScriptTestRunnerBase {
	public ScriptTestRunner(Class<?> testClass) {
		super(testClass, "test/test.js");
	}
}
