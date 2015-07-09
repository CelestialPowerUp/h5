#!/bin/bash

local_dir=".."
config="develop"
make_dir="h5-"$config
wechat="wechat"
xiaomi="xiaomi"
alipay="alipay"
normal="normal"
rc="rc"
mirc="mirc"

PATH=$PATH:./libs/

read -p "deploy "$4","$5","$6","$7","$8","$9"?(y/n): " deploy

bash _make_h5.sh $local_dir $config $make_dir $wechat $alipay $xiaomi $normal $rc $mirc $deploy &&

bash _ui.sh 123.59.52.186 yangaiche@test766 "/data/apps" $local_dir/$make_dir &&

bash _git.sh $local_dir $config $deploy