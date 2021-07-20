## 安装 pre-commit
```shell
pip install "pre-commit<2"
```

## 添加配置文件
在代码仓库里添加 `.pre-commit-config.yaml`

可以用命令 `pre-commit sample-config` 生成一个配置文件的样例。

下面是目前 VDI 后端 console、thor、vdidb 三个仓库在用的配置（适用于Python2）：
```yaml
default_language_version:
    python: python2.7
repos:
-   repo: https://github.com/asottile/seed-isort-config
    rev: v1.9.4
    hooks:
    -   id: seed-isort-config
        args:
        - --exclude=tests/.*\.py
        - --application-directories=".:oesas:tasks:standalone:init/app/main"
-   repo: https://github.com/pre-commit/mirrors-isort
    rev: v4.3.21
    hooks:
    -   id: isort
-   repo: https://github.com/pre-commit/mirrors-autopep8
    rev: v1.5.3
    hooks:
    -   id: autopep8
        args:
        - --in-place
        - --aggressive
        - --aggressive
        - --ignore=E114,E115,E116,E133,E401,E501,E701,W292
-   repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v2.5.0
    hooks:
    - id: check-added-large-files
      args:
      - --maxkb=512
    - id: check-docstring-first
    - id: check-json
    - id: check-merge-conflict
    - id: no-commit-to-branch
      args: [--pattern, ^\d+\.\d+\.\d+-dev$, --pattern, ^\d+\.\d+\.\d+-vpc$]
    - id: trailing-whitespace
    - id: end-of-file-fixer
-   repo: https://github.com/PyCQA/flake8
    rev: 3.9.0
    hooks:
    -   id: flake8
        exclude: third
        args:
        - --ignore=W503,W504,E123,E127,E203,E225,E241,E261,E265,E303,E501,F403,F405,C901

```

## 安装hooks
```shell
pre-commit install --install-hooks
```

2021年6月25日，`pre-commit-hooks` 的依赖库 `ruamel.yaml.clib` 发布了新版本，且不再支持 python2，导致上面的命令会安装失败：
```
An unexpected error has occurred: CalledProcessError: command: ('/home/yys/.cache/pre-commit/repoBpUgIn/py_env-python2.7/bin/python', u'/home/yys/.cache/pre-commit/repoBpUgIn/py_env-python2.7/bin/pip', 'install', '.')
return code: 1
expected return code: 0
stdout:
    ......
    Collecting importlib-metadata; python_version < "3.8"
      Using cached https://mirrors.aliyun.com/pypi/packages/98/b8/8ec57a8ef46fbe7f185318c7ff7df9a06c9df451d9a59a067bfa851bb828/importlib_metadata-2.1.1-py2.py3-none-any.whl (10 kB)
    Collecting ruamel.yaml.clib>=0.1.2; platform_python_implementation == "CPython" and python_version < "3.10"
      Using cached https://mirrors.aliyun.com/pypi/packages/b7/81/c04fb9be62657d4dce8aa2d99fde258a3af1cd77ec72af525593e9560127/ruamel.yaml.clib-0.2.4.tar.gz (180 kB)

stderr:
    DEPRECATION: Python 2.7 reached the end of its life on January 1st, 2020. Please upgrade your Python as Python 2.7 is no longer maintained. pip 21.0 will drop support for Python 2.7 in January 2021. More details about Python 2 support in pip can be found at https://pip.pypa.io/en/latest/development/release-process/#python-2-support pip 21.0 will remove support for this functionality.
        ERROR: Command errored out with exit status 1:
         command: /home/yys/.cache/pre-commit/repoBpUgIn/py_env-python2.7/bin/python -c 'import sys, setuptools, tokenize; sys.argv[0] = '"'"'/tmp/pip-install-C6m7_P/ruamel-yaml-clib/setup.py'"'"'; __file__='"'"'/tmp/pip-install-C6m7_P/ruamel-yaml-clib/setup.py'"'"';f=getattr(tokenize, '"'"'open'"'"', open)(__file__);code=f.read().replace('"'"'\r\n'"'"', '"'"'\n'"'"');f.close();exec(compile(code, __file__, '"'"'exec'"'"'))' egg_info --egg-base /tmp/pip-pip-egg-info-BdgRKo
             cwd: /tmp/pip-install-C6m7_P/ruamel-yaml-clib/
        Complete output (1 lines):
        minimum python version(s): [(3, 5)]
        ----------------------------------------
    ERROR: Command errored out with exit status 1: python setup.py egg_info Check the logs for full command output.
```

解决办法如下：

找到 `pre-commit` 的安装路径，修改其源码文件 `languages/python.py`，在171行插入下面这行代码：
```python
                helpers.run_setup_cmd(prefix, ('pip', 'install', 'ruamel.yaml.clib==0.2.2'))
```

也可以使用如下补丁文件：
```
--- languages/python.py.orig    2021-07-02 12:42:51.901581292 +0800
+++ languages/python.py 2021-07-02 12:42:09.560914585 +0800
@@ -168,6 +168,7 @@
                 python = os.path.realpath(sys.executable)
             _make_venv(env_dir, python)
             with in_env(prefix, version):
+                helpers.run_setup_cmd(prefix, ('pip', 'install', 'ruamel.yaml.clib==0.2.2'))
                 helpers.run_setup_cmd(
                     prefix, ('pip', 'install', '.') + additional_dependencies,
                 )
```

## 使用
git commit 的时候就会自动执行检查：

```shell
➜ git commit -m "修正：格式化字符串占位符错误"
seed isort known_third_party.............................................Passed
isort....................................................................Passed
autopep8.................................................................Passed
Check for added large files..............................................Passed
Check docstring is first.................................................Passed
Check JSON...........................................(no files to check)Skipped
Check for merge conflicts................................................Passed
Don't commit to branch...................................................Passed
Trim Trailing Whitespace.................................................Passed
Fix End of Files.........................................................Passed
flake8...................................................................Passed
[5.3.0-mtemp 47015235] 修正：格式化字符串占位符错误
 2 files changed, 6 insertions(+), 6 deletions(-)
```

有的时候可能需要忽略某些检查，设置 SKIP 环境变量为要忽略的id，多个id用英文逗号分隔：
```shell
SKIP=check-added-large-files git commit ...
```

Windows cmd 里：
```bash
set SKIP=check-added-large-files
git commit ...
set SKIP=
```

Windows powershell 里：
```shell
$env:SKIP=check-added-large-files
git commit ...
$env:SKIP=
```
**注意：非必要不要跳过检查**

~~在Windows开发环境，要把seed-isort-config检测忽略掉，否则vdi项目中在linux特有的库，而Windows没有，就会一直报错：~~ (**此问题已解决，不需要忽略了**)

更多使用技巧可参考官方文档：https://pre-commit.com/
