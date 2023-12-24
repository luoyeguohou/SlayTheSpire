// update to 2023/1/17 15:11:47 change product msg format
// SHA-1: eadaa52f777920708c81073d4aeedb3ce01858ab


export enum ServerMSG {
    // test  param={ "p" : 1 踢下线}
    Test = 777,
    TestFwdEcho = 999,
    TestFwdEchoRet = 1000,

    // c->s 登录， param={"u":用户名,"p":密码 "a":动作 0 默认值 找不到账号时会注册新账号 1 登陆 只登陆，找不到账号时会返回 用户不存在, "b":jsb的数据存储}
    Login = 10010,
    // s->c 登录成功
    LoginOK = 10012,
    // s->c 登录失败，param= { "ret": -1 无效用户名 -2 用户名不存在 -5 密码错误 >0 用户已经登录，登录的服务器id
    //                        "url": 玩家PVP断线后所在服务器的URL, "timeleft_secs": 被封号剩余秒数 }
    LoginFail = 10014,
    // c->s
    Logout = 10020,
    // s->c 踢出游戏
    //	param:
    //		>1000未定义原因。<=1000为特定原因，暂未定义
    KickOut = 10030,
    // c->s s->c 心跳
    Heartbeat = 10040,
    // c->s s->c 心跳回应，响应 Heartbeat
    HeartbeatRet = 10041,
    // s->c 重置客户端记录的账号信息
    ResetClientAccountInfo = 10055,

    // s->c 写文件 param={"filename":, "data":}
    WriteFile = 10060,
    // s->c 删文件 param={"filename":}
    RemoveFile = 10065,
    // s->c 执行js param={"js":}
    EvalJS = 10070,
    // s->c 测试包协议
    TestPack0 = 10080,

    //s->c 随机生成的消息密码 param={"p":"..."}
    PackPassword = 10090,

    //c->s请求GM功能
    //s->c param={"ret"-0有效-1无效, "sets":[]}
    GMRequest = 10100,

    //c->s GM设置 param={"sets":[]}
    //s->c param={"ret":0成功 1失败}
    GMSet = 10102,

    //c->s GM功能 param={"op":0-重置地图 1-重置当前坐标}
    //s->c param={"ret":0-成功 1-失败}
    GMFunc = 10104,

    //s->c 公告 param={
    //	"content":"公告内容",
    //	"id":用于区分不同公告的id ,"type":类型1-立即弹出 2-回城弹出,
    //  "secs": 持续秒数, "times":显示次数, "start": 公告有效期起始时间 "end" 公告有效期结束时间
    //  }
    SysAnnounce = 10150,

    TestUnlockAll = 10155,

    //c->s  param={"id": 店铺id  收益在common data中的 rewards字段 }
    MallProfit = 10227,

    // s->c 初始数据，登录后服务器发送客户端需要的大部分初始数据
    // param= {
    //     "items": [{"id": 道具id "qty": 数量},... ]
    //     "facilities":[{"name": 名称 "regionID":区id "typeID": 配置类型id "level": 等级},... ]}
    //     "regions": [{"id": 区id "level": 等级 "mallID": 所属店铺id exp: 经验}]
    //     "malls":[{"id": 店铺id "level": 等级 },... ]
    //     "customers": ["id": 客户id "favorability": 好感度 小于0 未解锁 "rewardFlag": 位标记 0x1010 表示第2个奖励以及第四奖励已经发放 },...  ] --
    //     "products": ["id": 商品id "exp": 经验数 小于0 未解锁 "slot": 上架索引] --
    //     "stories": ["id": 故事id "status": 位标记 第一位 是否解锁  第二位 是否已读] --
    //     "chapters": ["id": 章节id "status": 位标记 第一位 是否解锁] --
    //     "HeartbeatSec": 保活时间 x秒 在这个时间内未收到客户端请求会直接踢下线 客户端建议在这中间时间 1/2 x 秒发送 Heartbeat消息
    // }

    GameData = 10490,

    IDCommonEnd = 10500,

    // c->s 分享消息 type 1 抽牌 2 复活分享 3 通关分享
    // s->c param = {"ret": 0 成功 1 无效类型 "magatama": 当前宝石数目, "magatama_delta": 增量 , "type":类型 "dat": {"Type": 类型 "Reward": 奖励数量 "Left": 剩余次数}}
    ClientShare = 10502,

    ///////////
    // 客户端数据：用于供客户端保存自己的一些数据
    // 这些数据在 Game_data 消息的参数中以 client_data 字段名全部传回
    // 	所以存储数据必须注意
    // 		1：字段名足够短，比如3字符以内
    // 		2：数据足够简单，复杂数据尽量用数组而不用object
    // 		3：别包含字符串
    ///////////
    // c->s 请求存储客户端指定数据，一次可提交一个或多个字段数据
    // param= {
    // 	"字段名": 任意格式数据
    // }
    // s->c 存储结果： param=0成功，否则失败
    ClientDataSet = 10510,
    // c->s 请求客户端指定数据， param=字段名[,字段名...]
    // s->c 发送客户端指定数据
    // param= {
    // 	"字段名": 任意格式数据
    // }
    ClientDataGet = 10520,
    // c->s 客户端发送jsb错误日志 param = {"t": 0 jsb错误日志 1 异常抛出, "v:"版本号", l:"log内容"}
    ClientJSBLog = 10525,

    //c->s切换到前后台的消息 param={"f":0-切换到前台  1-切换到后台}
    ClientHide = 10530,

    DeletePID = 10531,

    //c->s切换到前后台的消息 param={"name": 姓名,"id": 身份证号码}
    //s->c切换到前后台的消息 param={"ret":0 验证成功 "msg": 错误信息}
    UnRegCheckID = 10532,

    //c->s 通知本uid对应的平台绑定ID param={"b":绑定ID字符串 "t": 0 IOS 1 微信}
    Binding = 10550,
    //s->c 平台绑定结果, param={
    //	"ret": 	0 - 成功
    //			1 - 已经绑定过其他ID
    //  "aid": 登陆aid ret为1时才有
    //  "p": 登陆密码 ret为1时才有
    //	"first": 如果成功，是否首次绑定
    //  "nickname": 微信登陆返回的用户名
    //}
    BindingRet = 10552,

    // c->s 获取公告内容
    // s->c param { 属性为id "1": {"id":1 "order_num": 显示顺序 小的优先, "state": 1 显示 0不显示, "title": 标题 "content": 内容} ... }
    GetFaq = 10555,

    // c->s 更新昵称 param={"nickname": 名字}
    // s->c param {"ret": 0 成功 1 名字长度为0或超过限制
    //                    5 含屏蔽字  10 勾玉不足
    //					  "nick_cost": 下一次修改名字消耗
    //                    "magatama": 剩余勾玉 "magatama_delta": 勾玉消耗}
    ChangeNickname = 10561,
    // c->s 解锁头像 param= {"id": 头像ID}
    // s->c param {"ret": 0 成功 1 无效id  5 已经解锁 10 勾玉不足
    //				"magatama": 勾玉数量 "magatama_delta":勾玉增量
    //				"id": 解锁id }
    UnlockPortrait = 10565,

    // c->s 签到
    // s->c param = {"ret": 0 成功 1 今天已经签到  5 签到已满 "dust": 粉尘数量 "dust_delta"： 粉尘增量 "magatama": 勾玉 "magatama_delta": 增量 "signin_data": 签到数据}
    ClientSign = 10570,

    // c->s 请求邮件数据
    // s->c param = {"mails": ["id": 邮件id,
    //							"title": 邮件标题,
    //							"content": 内容文本,
    //							"attachs": ["t": 附件类型
    //										1 角色卡牌包含 class_id:角色id card_id 卡牌id n 数量
    //										2 勾玉或者粉尘 id: 1 粉尘 2 勾玉 n 数量
    //										3 角色免费抽牌 class_id:角色id n 抽牌数量 ...],
    //							"read": 是否已读,
    //							"sent_time": 发送时间,
    //							"deadline": 截止时间,
    //							...]}
    MailList = 11200,
    // c->s 读邮件 param = {"id": 邮件id}
    // s->c param = {1 无效id 0 成功}
    MailRead = 11205,
    // c->s 获取邮件附件 param = {"id": 邮件id  当id <= 0 时为获取所有邮件, 会返回多个消息}
    // s->c param = {"ret": 0 成功 "id": 邮件id "mail": 得到后的邮件数据 "fetched": [得到的附件信息
    //																				{"t": 附件类型
    //																				"id": 勾玉增量,
    //																				"num": 数量},...
    //																				]}
    MailFetch = 11210,
    // c->s 删除邮件 param = {"id": 邮件id}
    // s->c param = {"ret": 1 无效邮件id 5 还有附件未获取 "id": 邮件id}
    MailRemove = 11215,
    // c->s 发送邮件给后台 param = {"title": 标题  "t":类型 "content": 内容 "qq": 联系qq "tel": 电话 }
    // s->c param = {0 成功 1 未留联系方式 3 没有标题 5 没有内容 7 内容超过长度 10 标题超过长度 15 发送邮件太频繁}
    MailSend = 11220,
    // s->c 通知客户端有新邮件 param = {新邮件数量}
    MailHasNew = 11225,

    // 所有消息 客户端均可携带 ctx字段  服务端不做处理 原样返回
    // -- common field 几乎所有消息都会带这个字段 用来处理变化数据
    // "changedGameData": -- 变化的游戏数据 数据格式与gamedata中对应字段一样
    //                   {"malls": 参考 gamedata 中的malls,
    //                    "regions": 参考 gamedata malls 中的regions
    //                    "items": 参考gamedata 中的items
    //                    "facilities": 参考gamedata  中的 facilities
    //                    "products": 参考gamedata 中的 products
    //                    "deltas": [{"type": 类型 "id": id, "num": 数量}] num负数
    //                    "rewards": [{"type": 类型 "id": id, "num": 数量
    //                    --以下字段为可选字段(可有可无)
    //                    "detail": {"mallPorf": 店铺id "profTimes": 收益次数 }}] num正数
    //                   }
    //
    // c->s 召唤怪物 {"num":召唤的数量}
    // s->c param={
    //	"ret": 0 成功  -1 宝箱数量不够 -2 有未处理的已经召唤的怪
    //  "monsters":[{"id":1,"mType":2,"quality":1,"lv":1,"atk":15,"hp":20,"skill":1,"sProp":0.15}] 召唤出来的怪物
    //	"extra": [{"id":1,"num":10}] 额外召唤出来的东西
    //	}
    Summon = 20001,

    // c->s 献祭怪物 {"idx":献祭的怪物在所有抽出来的怪中的idx}
    // s->c param={
    //	"ret": 0 成功 -1 数组越界
    //  "soulGet":获得的金币
    //  "expThisLv":当前等级经验
    //  "summonerLv":当前等级
    //  "lvUp":是否升级
    //  "rmvIdx":实际移除的idx，一般就是回显
    //}
    Sacrifice_monster = 20002,

    // c->s 献祭所有怪物
    // s->c param={
    //	"ret": 0 成功 -1 没有有效的可以献祭的怪物
    //  "soulGet":获得的金币
    //  "expThisLv":当前等级经验
    //  "summonerLv":当前等级
    //  "lvUp":是否升级
    //}
    Sacrifice_all_monster = 20003,

    // c->s 召唤阵的小升级（加固）
    // s->c param={
    // "ret": 0 成功 -1 金币不够
    // "upgradeProg":
    // "nextUpgrade": 下一次小升级会升级哪些位置
    // "smallLv": 1维9长度的数组，1表示已经加固，0表示没有加固
    // "upgradeProg": 已经小升级了多少次
    // }
    Summon_circle_small_upgrade = 20004,

    // c->s 召唤阵升级
    // s->c param={
    //  "ret" : 0成功  -1 已经满级  -2 小升级进度未达标 -3 资源消耗不足
    //  "time" : 13位时间戳，升级等待结束时间
    //}
    Summon_circle_upgrade = 20005,

    // c->s {"useNum":使用多少个沙漏} 使用沙漏减少升级等待时间
    // s->c param={
    //  "ret": 0成功 -1实际并没有这么多沙漏 -2 没有在等待升级完成
    //  "time": 使用完沙漏后 升级等待结束时间
    //}
    Use_sand_grass = 20006,

    // c->s 检查召唤阵升级到等待时间了
    // s->c param={
    //  "ret": 0 成功  -1 没在升级  -2 时间没到
    //  "sCircleLv" : 召唤阵等级
    //  "sCircleSmallLv" :1维9长度的数组，1表示已经加固，0表示没有加固
    //  "sCircleSmallProg":已经小升级了多少次
    //  "sCircleSmallNextUpgrade": 下一次小升级会升级哪些位置
    //  "isUpgradingSCircle" : 是否正在升级（一般升级成功这个都是false）
    //}
    Check_summon_circle_upgrade_countdown = 20007,

    // c->s 上阵怪物 {"idx":上阵的怪物在所有抽出来的怪中的idx}
    // s->c param={
    //  "ret": 0 成功 -1 数组越界
    //  "monsters": 阵上的怪物[{"id":1,"mType":2,"quality":1,"lv":1,"atk":15,"hp":20,"skill":1,"sProp":0.15}]
    //  "drawnMonsters" : 抽出来的还没上阵的怪物 (格式同monsters)
    //}
    Pitch_in_monster = 20008,

    // c->s 强化召唤阵 {"useJade":是否消耗钻石}
    // s->c param={
    //  "ret": 0 成功  -1 强化满了 -2 没满足召唤阵等级要求 -3 不用钻石消耗不够 -4 用了钻石消耗不够
    //  "enhanceLv":强化等级
    //}
    Enhance_summon_circle = 20009,

    // c->s 领取任务奖励
    // s->c param={
    //  "ret": 0成功 -1 任务没有完成
    //  "taskID": 新的任务id
    //  "taskVal": 当前任务的进度值
    //}
    Receive_task_reward = 20010,

    // c->s 每日抽奖
    // s->c param={
    //   "ret": 0 成功 -1 没有每日抽奖次数了
    //   "angle":转盘转了多少度，给客户端展示用的
    //	 "dailyDrawCnt":每日抽奖还剩多少次
    //}
    Daily_draw = 20011,

    // c->s 领取开服活动 {"day":领取第几天的奖励}
    // s->c param={
    //   "ret": 0 成功 -1 没到时间  -2 天数不对
    //   "day":开服领取到第几天了
    //   "nextRecvTime":能领取的时间了
    //}
    Receive_activity = 20012,

    // c->s 领取冒险模式章节奖励
    // s->c param = {
    // 	 "ret": 0 成功  -1 没有完成的章节
    //   "chapter": 下一个未领取的章节
    //}
    Receive_adventure_chapter_reward = 20013,

    // c->s 召唤领主
    // s->c param={
    //   "ret": 0成功 -1 蜡烛数量不够
    //   "hp" :  领主的血量
    //   "dmg":  已经打掉的血量
    //}
    Summon_lord = 20014,

    // c->s 设置自动召唤的目标稀有度 {"aim": 目标稀有度}
    // s->c  param = {"ret":0 成功}
    Change_auto_summon_aim = 20015,

    // c->s 水果熟成，客户端计时，水果该熟成的时候会发送这个消息
    // s->c param={
    //    "ret" 0 成功
    //    "fruits": 所有果实状态 [{lv:果实等级,state: 0空1正在长2已经熟了}] 数组长度必然是8
    //    "lastRecvTime": 上次结出果实的时间
    //}
    Fruit_ripe = 20016,

    // c->s 领取水果 {"fruitIdx":领取水果的idx}
    // s->c param={
    //   "ret" : 0 成功  -1 这个idx的果实并没有熟
    //   "seedGet" : 获得了多少个宝箱
    //   "fruits" :  所有果实状态 [{lv:果实等级,state: 0空1正在长2已经熟了}] 数组长度必然是8
    //   "lastRecvTime":上次结出果实的时间
    //}
    Receive_fruit = 20017,

    // c->s 领取所有水果
    // s->c param={
    //   "ret" : 0 成功  -1 这个idx的果实并没有熟
    //   "seedGet" : 获得了多少个宝箱
    //   "fruits" :  所有果实状态 [{lv:果实等级,state: 0空1正在长2已经熟了}] 数组长度必然是8
    //   "lastRecvTime":上次结出果实的时间
    //}
    Receive_all_fruits = 20018,

    // c->s 施肥立即获得果实
    // s->c param={
    //   "ret": 0 成功  -1 施肥所需钻石数不够
    //   "fertilizerCnt": 今日已经施肥的次数
    //   "seedGet" : 获得了多少个宝箱
    //   "fruitGet" : 获得了多少个水果
    //}
    Apply_fertilizer = 20019,

    // c->s 发起一场战斗 {"bType":战斗类型 0冒险 1黑暗之树探索 2攻击领主}
    // s->c param={
    //   "ret":0 成功
    //   "result":  1 敌人全部阵亡  -1 敌方未阵亡且己方全部阵亡 0 都未阵亡（100回合自动结束战斗）
    //   "records" : 战斗记录，供客户端展示战斗表现
    //   "advChapter" : 冒险章
    //   "advLv" : 冒险节
    //   "treeLv": 黑暗之树等级
    //   "curLord": 当前是哪个领主
    //   "lordDmg": 打了领主多少伤害
    //   "lordRecvIdx": 领主奖励领取的idx
    //}

    // 战斗记录格式如下:
    // [
    //	 {"cmd":"turnStart",turn:回合数}  -- 回合开始
    //   {"cmd":"turnStartStage",turn:回合数} --回合开始阶段
    //   {"cmd":"atkEachStage",turn:回合数} --对撞阶段
    //   {"cmd":"turnEndStage",turn:回合数} --回合结束阶段
    //   {"cmd":"atk",isEnemy:是否是敌人,pos:位置} --攻击动作
    //   {"cmd":"skill",skill: 用的哪个技能,isEnemy:是否是敌人,pos:位置, val: 技能值1, val2:技能值2 } --技能动作
    //   {"cmd":"acceptDmg",isEnemy:是否是敌人,pos:位置 , dmg:伤害} --接受伤害
    // ]
    Battle_request = 20020,

    // c->s 放置一个蜡烛
    // s->c param={
    //	"ret" :0 成功  -1 没有蜡烛  -2 已经有6个蜡烛了
    //}
    Put_candle = 20021,
    // c->s 刷新排行榜
    // s->c param={
    //   "rankList" :  [{
    // "profile_pic_url" : 头像
    // "name" :  名字
    // "rank" : 排名
    // "title" : 称号
    // "score" : 分数}]
    //}
    Refresh_rank_list = 20022,

    // c->s 刷新 可挑战的对象
    // s->c  param={
    //   "rankList" :  [{
    // "profile_pic_url" : 头像
    // "name" :  名字
    // "rank" : 排名
    // "title" : 称号
    // "score" : 分数}]
    //}
    Refresh_defenders = 20023,

    // c->s {uid:xxx} 挑战某个人
    // s->c param = {
    //	"records" : 战斗记录，供客户端展示战斗表现
    //  "result" : 是否胜利
    //  "selfScore": 自己的积分
    //  "otherScore":对面的积分
    //  "rankList": 排行榜数据
    //  "monsters":对面的怪物
    //}
    Arena_challenge = 20024,

    // c->s {uid:xxx} 复仇某个人
    // s->c param = {
    //	"records" : 战斗记录，供客户端展示战斗表现
    //  "result" : 是否胜利
    //  "selfScore": 自己的积分
    //  "otherScore":对面的积分
    //  "rankList": 排行榜数据
    //  "monsters":对面的怪物
    //}
    Arena_revenge = 20025,

    // c->s 获取某人的具体信息
    // s->c param = {
    //  "monsters":对面的怪物
    //}
    Request_arena_detail = 20026,
    Receive_Arena_Daily_Reward = 20027,
    // 临时增加资源
    TempAddRes = 20028,
    UpdateWechatData = 20029,
    TempAddScore = 20030,

    ChangeCardPool = 20031,

    TempChangeMonster = 20032,
    OnDaily = 20033,
    Receive_I_Book_Reward = 20034,
    Receive_adventure_chapter_reward_new = 20035,



  // 创建房间  cs sc
	Create_Room = 30001,
	// 加入房间  cs sc
	Join_Room = 30002,
	// 房间信息更改 sc
	Room_State_Change = 30003,
	// 更换座位 cs
	Change_Site = 30004,
	// 离开房间 cs
	Exis_Room = 30005,

	// 更换游戏 暂时没用
	Change_Game = 30006,
	// 开始游戏 cs sc
	Start_Game = 30007,
	Change_Name = 30008,
	HeartBeat = 30009,

	// 选择玩家 cs
	Toufu_Choose_Player = 30101,
  // 回合结束 sc
	Toufu_Turn_End = 30102,
  // 游戏结束 sc
	Toufu_Game_End = 30103,
}