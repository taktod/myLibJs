package com.ttProject.myLibJs.test;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.junit.runner.Description;
import org.junit.runner.Runner;
import org.junit.runner.notification.Failure;
import org.junit.runner.notification.RunNotifier;
import org.mozilla.javascript.Context;
import org.mozilla.javascript.Scriptable;

/**
 * ちょっとつくってみよう
 * @author taktod
 */
public abstract class ScriptTestRunnerBase extends Runner {
	private List<String> funcNames = new ArrayList<String>();
	private Context ctx = Context.enter();
	private Scriptable scope = ctx.initStandardObjects();
//	private ScriptEngine engine = null;
//	private Bindings vars = null;
	public ScriptTestRunnerBase(Class<?> testClass, String target) {
		// この部分でテストをつくっておきたいところ。
		// テストコードを確認しておいて、必要なデータを取り出しておく。
		// 動作させるコードを決定しておきたいといったところか？
		FileReader reader = null;
		try {
			// depsを更新しておきます。
			Runtime.getRuntime().exec("./updatedeps.sh");
			ctx.setOptimizationLevel(-1);
			scope.put("loadObj", scope, this);
			ctx.evaluateString(scope, "this.CLOSURE_IMPORT_SCRIPT = function(val) {loadObj.importScript(val);return true;};", "<cmd>", 1, null);
			ctx.evaluateString(scope, "console = {};", "<cmd>", 1, null);
			ctx.evaluateString(scope, "console.log = function(val){loadObj.print(val);};", "<cmd>", 1, null);
			ctx.evaluateString(scope, "console.dir = loadObj.print;", "<cmd>", 1, null);
			ctx.evaluateString(scope, "console.clear = function(){};", "<cmd>", 1, null);
			ctx.evaluateString(scope, "jcom = com;com = null;", "<cmd>", 1, null);
			ctx.evaluateReader(scope, new FileReader("polyfill/typedarray.js"), "typedarray.js", 1, null);
			ctx.evaluateReader(scope, new FileReader("closure-library/closure/goog/base.js"), "base.js", 1, null);
			ctx.evaluateReader(scope, new FileReader("deps.js"), "deps.js", 1, null);
			ctx.evaluateReader(scope, new FileReader("depstest.js"), "depstest.js", 1, null);
			ctx.evaluateReader(scope, new FileReader(target), target, 1, null); // ここだけいれかえておきたい。

			Pattern pattern = Pattern.compile("function ([\\w]+).*");
			reader = new FileReader(target);
			BufferedReader br = new BufferedReader(reader);
			String line = null;
			while((line = br.readLine()) != null) {
				Matcher m = pattern.matcher(line);
				if(m.matches()) {
					funcNames.add(m.group(1));
				}
			}
			br.close();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		finally{
			if(reader != null) {
				try {
					reader.close();
				}
				catch(Exception e) {
				}
				reader = null;
			}
		}
	}
	@Override
	public Description getDescription() {
		Description desc = Description.createSuiteDescription("ClosureTest");
		for(String func : funcNames) {
			desc.addChild(getDescription(func));
		}
		return desc;
	}
	private Description getDescription(String testName) {
		return Description.createTestDescription("JSTest", testName);
	}
	@Override
	public void run(RunNotifier notifier) {
		Description desc = getDescription();
		notifier.fireTestRunStarted(desc);
		for(String func : funcNames) {
			invokeTest(notifier, func);
		}
		notifier.fireTestFinished(desc);
	}
	private void invokeTest(RunNotifier notifier, String testCase) {
		Description desc = getDescription(testCase);
		notifier.fireTestStarted(desc);
		try {
			// ここが実行実体なのか・・・なるほど
			System.out.println("Execute: " + desc);
			ctx.evaluateString(scope, testCase + "();", testCase, 1, null);
			System.out.println();
		}
		catch(AssertionError e) {
			e.printStackTrace();
			notifier.fireTestFailure(new Failure(desc, e));
		}
		catch(Exception e) {
			e.printStackTrace();
			notifier.fireTestFailure(new Failure(desc, e));
		}
		finally {
			notifier.fireTestFinished(desc);
		}
	}
	public void importScript(String val) throws Exception {
		File f = new File("closure-library/closure/goog/" + val);
		ctx.evaluateReader(scope, new FileReader(f), f.getAbsolutePath(), 1, null);
	}
	public void print(Object val) throws Exception {
		System.out.println(val.toString());
	}
}
