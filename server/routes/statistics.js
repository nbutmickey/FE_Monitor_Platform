var express = require('express');
var router = express.Router();
let pvinfo = require("../service/pvinfo");
let apiinfo = require("../service/apiinfo");
let uvinfo = require("../service/uvinfo");
let perinfo = require("../service/perinfo");
let time = require("../utils/time");
let groupCalc = require("../utils/groupType")
let middleware = require("../utils/middleware");

/*请求页面相关数据*/
router.get("/pageTop", middleware.validate, async function (req, res, next) {
    try {
        let appID = req.query.appID;
        let { sTime, eTime } = time.computeTimeDivider(req.query.dimensionType);
        let data = await pvinfo.getPageTop(appID, sTime, eTime);
        res.json({
            success: true,
            note: "数据返回成功",
            data
        })
    } catch (error) {
        res.json({
            success: false,
            note: error
        })
    }
});

router.get("/pvAndUvNumToday", middleware.validate, async function (req, res, next) {
    try {
        let appID = req.query;
        let data = await pvinfo.getPVAndUVNumToday(appID);
        res.json({
            success: true,
            note: "数据返回成功",
            data
        })
    } catch (error) {
        res.json({
            success: false,
            note: error
        })
    }
});

router.get("/pvAndUvNumByDivider", async function (req, res, next) {
    try {
        let appID = req.query.appID;
        let { sTime, eTime, divider } = time.computeTimeDivider(req.query.dimensionType);
        let data = pvinfo.getPvNumByDivider(appID, sTime, eTime, divider);
        res.json({
            success: true,
            note: "数据返回成功",
            data
        })
    } catch (error) {
        res.json({
            success: false,
            note: error
        })
    }
})

router.get("/pvAndUvNumByGeo", async function (req, res, next) {
    try {
        let appID = req.query.appID;
        let { sTime, eTime } = time.computeTimeDivider(req.query.dimensionType);
        let data = pvinfo.getPvAndUvNumByGeo(appID, sTime, eTime);
        res.json({
            success: true,
            note: "数据返回成功",
            data
        })
    } catch (error) {
        res.json({
            success: false,
            note: error
        })
    }
})

router.get("/clientInfo", async function (req, res, next) {
    try {
        let appID = req.query.appID;
        let groupType = groupCalc.computeGroupType(req.groupType);
        let data = uvinfo.getClietnInfo(appID, sTime, eTime, groupType);
        let { sTime, eTime } = time.computeTimeDivider(req.query.dimensionType);
        res.json({
            success: true,
            note: "数据返回成功",
            data
        })
    } catch (error) {
        res.json({
            success: false,
            note: error
        })
    }
});

/*请求性能相关数据*/
router.get("/keyPerToday", async function (req, res, next) {
    try {
        let appID = req.query.appID;
        let data = await perinfo.getKeyPerToday(appID);
        res.json({
            success: true,
            note: "数据返回成功",
            data
        })
    } catch (error) {
        res.json({
            success: false,
            note: error,
        })
    }
})

router.post("/keyPerDividerByPage", async function (req, res, next) {
    try {
        let { dimensionType, appID, page } = req.body;
        let { sTime, eTime, divider } = time.computeTimeDivider(dimensionType);
        let data = await perinfo.getKeyPerDividerByPage(appID, sTime, eTime, page, divider);
        res.json({
            success: true,
            note: "数据返回成功",
            data
        })
    } catch (error) {
        res.json({
            success: false,
            note: error,
        })
    }
})

router.post("/loadPerDividerByPage", async function (req, res, next) {
    try {
        let { dimensionType, appID, page } = req.body;
        let { sTime, eTime, divider } = time.computeTimeDivider(dimensionType);
        let data = await perinfo.getLoadPerDividerByPage(appID, sTime, eTime, page, divider);
        res.json({
            success: true,
            note: "数据返回成功",
            data
        })
    } catch (error) {
        res.json({
            success: false,
            note: error
        })
    }
})

router.post("/waterfallDividerByPage", async function (req, res, next) {
    try {
        let { dimensionType, appID, page } = req.body;
        let { sTime, eTime, divider } = time.computeTimeDivider(dimensionType);
        let data = await perinfo.getWaterfallDividerByPage(appID, sTime, eTime, page, divider);
        res.json({
            success: true,
            note: "数据返回成功",
            data
        })
    } catch (error) {
        res.json({
            success: false,
            note: error,
        })
    }
})

router.get("/fullyLoadPerByGroupType", async function (req, res, next) {
    try {
        let { dimensionType, appID } = req.query;
        let groupType = groupCalc.computeGroupType(req.query.groupType);
        let { sTime, eTime } = time.computeTimeDivider(dimensionType);
        let data = await perinfo.getFullyLoadPer(appID, sTime, eTime, groupType);
        res.json({
            success: true,
            note: "数据返回成功",
            data
        })
    } catch (error) {
        res.json({
            success: false,
            note: error
        })
    }
})

router.post("/apdex", async function (req, res, next) {
    try {
        let { dimensionType, appID, page } = req.body;
        let { sTime, eTime } = time.computeTimeDivider(dimensionType);
        let data = await perinfo.getApdex(appID, sTime, eTime, page);
        res.json({
            success: true,
            note: "数据返回成功",
            data
        })
    } catch (error) {
        res.json({
            success: false,
            note: error
        })
    }
})

/*请求API相关数据*/
router.get("/getAPIToday", async function (req, res, next) {
    try {
        let { appID } = req.query;
        let data = await apiinfo.getAPIToday(appID);
        res.json({
            success: true,
            note: "数据返回成功",
            data
        })
    } catch (error) {
        res.json({
            success: false,
            note: error
        })
    }

})

router.get("/getFailAPITop", async function (req, res, next) {
    try {
        let { dimensionType, appID } = req.query;
        let { sTime, eTime } = time.computeTimeDivider(dimensionType);
        let data = await apiinfo.getFailAPITop(appID, sTime, eTime);
        res.json({
            success: true,
            note: "数据返回成功",
            data
        })
    } catch (error) {
        res.json({
            success: false,
            note: error
        })
    }
})

router.get("/getSuccessAPIByDivider", async function (req, res, next) {
    try {
        let { dimensionType, appID } = req.query;
        let { sTime, eTime, divider } = time.computeTimeDivider(dimensionType);
        let data = await apiinfo.getSuccessAPIByDivider(appID, sTime, eTime, divider);
        res.json({
            success: true,
            note: "数据返回成功",
            data
        })
    } catch (error) {
        res.json({
            success: false,
            note: error
        })
    }

})

router.get("/getFailAPIByDivider", async function (req, res, next) {
    try {
        let { dimensionType, appID } = req.query;
        let { sTime, eTime, divider } = time.computeTimeDivider(dimensionType);
        let result = await apiinfo.getFailAPIByDivider(appID, sTime, eTime, divider);
        res.json({
            success: true,
            note: "数据返回成功",
            data: result
        })
    } catch (error) {
        res.json({
            success: false,
            note: error
        })
    }

})

router.get("/getAPIInfoByGroupType", async function (req, res, next) {
    try {
        let { dimensionType, appID } = req.query;
        let { sTime, eTime } = time.computeTimeDivider(dimensionType);
        let groupType = groupCalc.computeGroupType(req.query.groupType);
        let data = await apiinfo.getAPIInfoByGroupType(appID, sTime, eTime, groupType);
        res.json({
            success: true,
            note: "数据返回成功",
            data
        })
    } catch (error) {
        res.json({
            success: false,
            note: error
        })
    }

})
module.exports = router;
