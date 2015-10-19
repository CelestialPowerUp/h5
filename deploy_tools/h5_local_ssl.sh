#!/bin/bash

local_dir=".."
config="local"
make_dir="h5-"${config}"-ssl"

PATH=$PATH:./libs/

bash _make_h5.sh ${local_dir} ${config} ${make_dir} "-ssl"
