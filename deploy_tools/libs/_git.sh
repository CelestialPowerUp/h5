#!/bin/bash

local_dir="$1"
local_cfg="$2"
cfgfile=${local_dir}/${local_cfg}"_version.cfg"

if [ -e ${cfgfile} ]; then
	version=$(cat ${cfgfile})
	echo ${version}
else
	version=0
	echo ${cfgfile} file not exits
fi

version=$(expr ${version} + 1)
echo ${version} > ${cfgfile}

git add ${cfgfile}
comment="$local_cfg $version"
echo ${comment}
git commit -am "$comment"
