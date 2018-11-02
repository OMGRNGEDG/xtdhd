
var hostmain = "https://wxapp.jvinn.com/api/"; // 测试
var locast = "https://wxapp.jvinn.com/" ;
var config = {
    // Predeter
    CODE: '6393638c3d8bb43b31afb7292c75be57',
    Predeter: hostmain + 'Predeter', // 提交项目预定(不需要token)
    Token: locast + 'token',
    // Project
    Project : hostmain +'Project/',
    // User
    Getlogincode: hostmain+ 'User/getlogincode' , // 获取登陆短信验证码(不需要token)
    User : hostmain + 'User/',
    Info : hostmain + 'User/info', // 获取股东个人资料(需要token)
    Usermoney : hostmain + 'User/usermoney' , // 获取用户资金列表
    Withdrawal : hostmain + 'User/withdrawal' , // 用户提现
    Projects : hostmain + 'User/projects',  // 获取用户项目(需要token)
    Funds : hostmain + 'User/funds' , // 获取用户分红列表(需要token)
    Expense : hostmain + 'User/expense' , // 获取用户消费卡列表

};
module.exports = config