#!/bin/bash

local_dir="$1"
local_cfg="$2"
deploy="$3"
cfgfile=$local_dir/$local_cfg"_version.cfg"

if [ -e $cfgfile ]; then
	version=$(cat $cfgfile)
	echo $version
else
	version=0
	echo $cfgfile file not exits
fi

#arrVersion=(${version//\./ })

version=$(expr $version + 1)
echo $version > $cfgfile

deployed=" "

if [ ${deploy:0:1} == 'y' ]; then
    deployed=deployed"wechat "
fi

if [ ${deploy:1:1} == 'y' ]; then
   	deployed=deployed"alipay "
fi

if [ ${deploy:2:1} == 'y' ]; then
    deployed=deployed"xiaomi "
fi

if [ ${deploy:3:1} == 'y' ]; then
    deployed=deployed"normal "
fi

if [ ${deploy:4:1} == 'y' ]; then
    deployed=deployed"rc "
fi

if [ ${deploy:5:1} == 'y' ]; then
    deployed=deployed"mirc "
fi

read -p "deploy RollbackAble version?(y/n): " RollbackAble

git add $cfgfile
if [ $RollbackAble == 'y' ]; then
	comment="$local_cfg stable"$deployed"$version"
	git commit -m $comment
	#git tag $comment
else
	comment="$local_cfg beta"$deployed"$version"
	git commit -m $comment
	#git tag $comment
fi
