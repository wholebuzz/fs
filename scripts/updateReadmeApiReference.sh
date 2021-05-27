#!/bin/bash
sed '/## API Reference/q' README.md >> README.md.new
mv README.md.new README.md
echo '' >> README.md
cat docs/modules.md | sed "s/(\(.*\))/(docs\/\1)/g" >> README.md
