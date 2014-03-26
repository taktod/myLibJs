#!/bin/bash

# deps for develop
closure-library/closure/bin/build/depswriter.py \
  --root_with_prefix="src ../../../src/" \
  > deps.js

# compile for libraries

#closure-library/closure/bin/build/closurebuilder.py \
#  --root=closure-library/ \
#  --root=src/ \
#  --namespace="com.ttProject.channel.Uint8ReadChannel" \
#  --output_mode=compiled \
#  --compiler_jar=compiler.jar \
#  > myLib.js

closure-library/closure/bin/build/closurebuilder.py \
  --root=closure-library/ \
  --root=src/ \
  --root=test/ \
  --namespace="onload" \
  --output_mode=compiled \
  --compiler_jar=compiler.jar \
  --compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" \
  > myLib_min.js
