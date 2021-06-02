#!/bin/bash
DATADIR="$(dirname $0)/data"

function test() {
    jq -r --arg url $1 "include \"./zentao\"; main" $2 > /dev/null
    if [ ! $? -eq 0 ]; then
        echo "test failed: $1"
        exit 1;
    else
        echo "test success: $1"
    fi
}
test "my-task" "$DATADIR/my-task.json"
test "my-bug" "$DATADIR/my-bug-assignedTo-id_desc-2-500-1.json"
test "my-story" "$DATADIR/my-story-assignedTo-id_desc-30-2000-1.json"
test "my-project" "$DATADIR/my-project.json"
test "my-dynamic" "$DATADIR/my-dynamic-lastmonth.json"
test "product-all" "$DATADIR/product-all.json"
test "product-browse-7" "$DATADIR/product-browse-7--unclosed-0--1327-2000-1.json"
test "product-dynamic-7" "$DATADIR/product-dynamic-7.json"
test "product-project-all-7" "$DATADIR/product-project-all-7.json"
test "productplan-browse-7" "$DATADIR/productplan-browse-7.json"
test "productplan-view-141" "$DATADIR/productplan-view-141.json"
test "project-story-412" "$DATADIR/project-story-412-order_desc-byModule-0-144-2000-1.json"
# TODO: need data
# test "project-bug-412" "$DATADIR/project-bug-412-status,id_desc-0--0-754-100-2.json"
# TODO: need recovery
# test "project-task-412" "$DATADIR/project-task-412-unclosed-0--273-2000-1.json"
# test "project-dynamic-412" "$DATADIR/project-dynamic-412-yesterday.json"
# TODO: need impl
# test "company-browse" "$DATADIR/company-browse.json"
test "company-group" "$DATADIR/group-browse.json"
test "company-dynamic" "$DATADIR/company-dynamic.json"