#!/bin/bash

# deps for develop
closure-library/closure/bin/build/depswriter.py \
  --root_with_prefix="src ../../../src/" \
  > deps.js

closure-library/closure/bin/build/depswriter.py \
  --root_with_prefix="test ../../../test/" \
  > depstest.js
