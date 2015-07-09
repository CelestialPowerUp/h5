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

git add $cfgfile

if [ $local_cfg == 'production' ]; then
	RollbackAble='y'
else
	read -p "deploy RollbackAble version?(y/n): " RollbackAble
fi

if [ $RollbackAble == 'y' ]; then

	deployed=" "

	if [ ${deploy:0:1} == 'y' ]; then
		echo wechat stable
	    deployed=$deployed"wechat "
	fi

	if [ ${deploy:1:1} == 'y' ]; then
		echo alipay stable
	   	deployed=$deployed"alipay "
	fi

	if [ ${deploy:2:1} == 'y' ]; then
		echo xiaomi stable
	    deployed=$deployed"xiaomi "
	fi

	if [ ${deploy:3:1} == 'y' ]; then
		echo normal stable
	    deployed=$deployed"normal "
	fi

	comment="$local_cfg stable"$deployed"$version"
	echo $comment
	git commit -am "$comment"
	#git tag $comment
else
	comment="$local_cfg beta $version"
	echo $comment
	git commit -am "$comment"
	#git tag $comment
fi
