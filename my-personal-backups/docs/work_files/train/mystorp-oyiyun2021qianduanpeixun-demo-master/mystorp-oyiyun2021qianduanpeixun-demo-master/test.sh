#!/bin/sh
if [ ! -f "package.json" ]; then
    echo "请从 demo 仓库里面复制如下文件到本仓库："
    echo "  package.json"
    echo "  guard.js"
    echo "  test.sh"
    echo "  js1/*.test.js"
    echo "  js2/*.test.js"
    echo "  dom1/*.test.js"
    echo "  dom2/*.test.js"
    echo "  dom3/*.test.js"
    echo "  dom4/*.test.js"
    echo "  vue1/*.test.js"
    echo "  vue2/*.test.js"
    echo "  vue3/*.test.js"
    exit 1
fi
npm install
for dir in js1 js2 dom1 dom2 dom3 dom4 vue1 vue2 vue3; do 
    if [ -d $dir ]; then
        npm run test -- $dir/*.test.js
    fi
done
