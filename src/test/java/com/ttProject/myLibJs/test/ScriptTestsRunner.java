package com.ttProject.myLibJs.test;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.script.Bindings;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import javax.script.SimpleBindings;

import org.junit.runner.Description;
import org.junit.runner.Runner;
import org.junit.runner.notification.Failure;
import org.junit.runner.notification.RunNotifier;

/**
 * ちょっとつくってみよう
 * @author taktod
 */
public class ScriptTestsRunner extends Runner {
	private List<String> funcNames = new ArrayList<String>();
	private ScriptEngine engine = null;
	private Bindings vars = null;
	public ScriptTestsRunner(Class<?> testClass) {
		// この部分でテストをつくっておきたいところ。
		// テストコードを確認しておいて、必要なデータを取り出しておく。
		// 動作させるコードを決定しておきたいといったところか？
		FileReader reader = null;
		try {
			// depsを更新しておきます。
			Runtime.getRuntime().exec("./updatedeps.sh");
			ScriptEngineManager manager = new ScriptEngineManager();
			engine = manager.getEngineByName("javascript");
			vars = new SimpleBindings();
			vars.put("loadObj", this);
			// データ読み込み動作の構築
			engine.eval("this.CLOSURE_IMPORT_SCRIPT = function(val) {loadObj.importScript(val);return true;};", vars);
			// データ読み込み動作の構築
			engine.eval("console = {};", vars);
			engine.eval("console.log = function(val) {print(val + \"\\n\");};", vars);
			engine.eval("console.dir = function(val) {print(val);};", vars);
			engine.eval("console.clear = function() {};", vars);
			// javaオブジェクトとして予約されている部分を撤去(closureで初期化できるようにする)
			engine.eval("com = null;", vars);
			// typedArrayを利用するためのライブラリ読み込み
			engine.eval(new FileReader("polyfill/typedarray.js"), vars);
			// closure-library利用する
			engine.eval(new FileReader("closure-library/closure/goog/base.js"), vars);
			// 依存関連読み込み
			engine.eval(new FileReader("deps.js"), vars);
			// 依存関連読み込み(テストコード用)
			engine.eval(new FileReader("depstest.js"), vars);
			// scriptを読み込んでしまう。
			engine.eval(new FileReader("test/test.js"), vars);

			Pattern pattern = Pattern.compile("function ([\\w]+).*");
			reader = new FileReader("test/test.js");
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
		return Description.createTestDescription("DynamicTests", testName);
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
			engine.eval(testCase + "();", vars);
			System.out.println();
		}
		catch(AssertionError e) {
			e.printStackTrace();
			notifier.fireTestFailure(new Failure(desc, e));
		}
		catch(ScriptException e) {
			e.printStackTrace();
			notifier.fireTestFailure(new Failure(desc, e));
		}
		finally {
			notifier.fireTestFinished(desc);
		}
	}
	public void importScript(String val) throws Exception {
		File f = new File("closure-library/closure/goog/" + val);
		engine.eval(new FileReader(f), vars);
	}
}
