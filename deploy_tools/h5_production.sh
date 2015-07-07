#!/bin/bash

local_dir="../"
config="production"
make_dir="h5-"$config
wechat="wechat"
xiaomi="xiaomi"
alipay="alipay"
normal="normal"
rc="rc"
mirc="mirc"

PATH=$PATH:./libs/

read -p "deploy "$wechat","$alipay","$xiaomi","$normal","$rc","$mirc"?(y/n): " deploy

bash _make_h5.sh $local_dir $config $make_dir $wechat $alipay $xiaomi $normal $rc $mirc $deploy &&

bash _ui.sh 120.132.59.94 $PRODUCTION_PWD "/data/apps" $local_dir/$make_dir &&

bash _git.sh $local_dir $config $deploy