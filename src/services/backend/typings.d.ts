declare namespace API {
  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseGeneratorVO_ = {
    code?: number;
    data?: GeneratorVO;
    message?: string;
  };

  type BaseResponseInt_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseListChildrenCommentVo_ = {
    code?: number;
    data?: ChildrenCommentVo[];
    message?: string;
  };

  type BaseResponseListRootCommentVo_ = {
    code?: number;
    data?: RootCommentVo[];
    message?: string;
  };

  type BaseResponseListStarBookBoolVo_ = {
    code?: number;
    data?: StarBookBoolVo[];
    message?: string;
  };

  type BaseResponseLoginUserVO_ = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseNotificationVO_ = {
    code?: number;
    data?: NotificationVO;
    message?: string;
  };

  type BaseResponsePageGenerator_ = {
    code?: number;
    data?: PageGenerator_;
    message?: string;
  };

  type BaseResponsePageGeneratorVO_ = {
    code?: number;
    data?: PageGeneratorVO_;
    message?: string;
  };

  type BaseResponsePageNotification_ = {
    code?: number;
    data?: PageNotification_;
    message?: string;
  };

  type BaseResponsePageNotificationVO_ = {
    code?: number;
    data?: PageNotificationVO_;
    message?: string;
  };

  type BaseResponsePageUser_ = {
    code?: number;
    data?: PageUser_;
    message?: string;
  };

  type BaseResponsePageUserVO_ = {
    code?: number;
    data?: PageUserVO_;
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseUser_ = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserVO_ = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type ChildrenCommentVo = {
    content?: string;
    createTime?: string;
    fromId?: string;
    fromUsername?: string;
    generatorId?: string;
    id?: string;
    likeCount?: number;
    rootId?: string;
    toCommentId?: string;
    toId?: string;
    toUsername?: string;
    userAvatar?: string;
  };

  type createStarBookUsingPOSTParams = {
    /** name */
    name: string;
  };

  type DeleteRequest = {
    id?: string;
  };

  type downloadGeneratorByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type FileConfig = {
    files?: FileInfo[];
    inputRootPath?: string;
    outputRootPath?: string;
    sourceRootPath?: string;
    type?: string;
  };

  type FileInfo = {
    condition?: string;
    files?: FileInfo[];
    generateType?: string;
    groupKey?: string;
    groupName?: string;
    inputPath?: string;
    outputPath?: string;
    type?: string;
  };

  type Generator = {
    author?: string;
    basePackage?: string;
    commentCount?: string;
    createTime?: string;
    description?: string;
    distPath?: string;
    fileConfig?: string;
    hot?: number;
    id?: string;
    isDelete?: number;
    likeCount?: string;
    modelConfig?: string;
    name?: string;
    picture?: string;
    score?: number;
    starCount?: string;
    status?: number;
    tags?: string;
    updateTime?: string;
    userId?: string;
    version?: string;
    viewCount?: string;
  };

  type GeneratorAddRequest = {
    author?: string;
    basePackage?: string;
    description?: string;
    distPath?: string;
    fileConfig?: FileConfig;
    modelConfig?: ModelConfig;
    name?: string;
    picture?: string;
    status?: number;
    tags?: string[];
    version?: string;
  };

  type GeneratorCacheRequest = {
    id?: string;
  };

  type GeneratorEditRequest = {
    author?: string;
    basePackage?: string;
    description?: string;
    distPath?: string;
    fileConfig?: FileConfig;
    id?: string;
    modelConfig?: ModelConfig;
    name?: string;
    picture?: string;
    tags?: string[];
    version?: string;
  };

  type GeneratorMakeRequest = {
    meta?: Meta;
    zipFilePath?: string;
  };

  type GeneratorQueryRequest = {
    author?: string;
    basePackage?: string;
    current?: string;
    description?: string;
    distPath?: string;
    id?: string;
    name?: string;
    orTags?: string[];
    pageSize?: string;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    tags?: string[];
    userId?: string;
    version?: string;
  };

  type GeneratorUpdateRequest = {
    author?: string;
    basePackage?: string;
    description?: string;
    distPath?: string;
    fileConfig?: FileConfig;
    id?: string;
    modelConfig?: ModelConfig;
    name?: string;
    picture?: string;
    status?: number;
    tags?: string[];
    version?: string;
  };

  type GeneratorUseRequest = {
    dataModel?: Record<string, any>;
    id?: string;
  };

  type GeneratorVO = {
    author?: string;
    basePackage?: string;
    commentCount?: string;
    createTime?: string;
    description?: string;
    distPath?: string;
    fileConfig?: FileConfig;
    hot?: number;
    id?: string;
    likeCount?: string;
    modelConfig?: ModelConfig;
    name?: string;
    picture?: string;
    score?: number;
    starCount?: string;
    status?: number;
    tags?: string[];
    updateTime?: string;
    user?: UserVO;
    userId?: string;
    version?: string;
    viewCount?: string;
  };

  type getCaptchaUsingGETParams = {
    /** emailAccount */
    emailAccount?: string;
  };

  type getChildrenOfRootUsingGETParams = {
    /** id */
    id?: string;
  };

  type getGeneratorVOByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type getNotificationVOByDomainUsingGETParams = {
    /** domain */
    domain: string;
  };

  type getNotificationVOByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type getRootCommentsOfGeneratorUsingGETParams = {
    /** id */
    id?: string;
  };

  type getStarBooksByIdUsingGETParams = {
    /** id */
    id: string;
  };

  type getStarBooksUsingGETParams = {
    /** generatorId */
    generatorId: string;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type getUserVOByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type IdRequest = {
    id?: string;
  };

  type likeCommentUsingPOSTParams = {
    /** id */
    id?: string;
  };

  type likeGeneratorRedisUsingPOSTParams = {
    createBy?: string;
    createTime?: string;
    current?: string;
    generatorId?: string;
    id?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
  };

  type likeGeneratorUsingPOSTParams = {
    /** id */
    id: string;
  };

  type LoginUserVO = {
    accessKey?: string;
    createTime?: string;
    email?: string;
    id?: string;
    phone?: string;
    secretKey?: string;
    updateTime?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type Meta = {
    author?: string;
    basePackage?: string;
    createTime?: string;
    description?: string;
    fileConfig?: FileConfig;
    forcedInteractiveSwitch?: boolean;
    modelConfig?: ModelConfig;
    name?: string;
    version?: string;
    versionControl?: boolean;
  };

  type ModelConfig = {
    models?: ModelInfo[];
  };

  type ModelInfo = {
    abbr?: string;
    allArgsStr?: string;
    condition?: string;
    defaultValue?: Record<string, any>;
    description?: string;
    fieldName?: string;
    groupKey?: string;
    groupName?: string;
    models?: ModelInfo[];
    type?: string;
  };

  type Notification = {
    content?: string;
    createTime?: string;
    domain?: string;
    endTime?: string;
    id?: string;
    isDelete?: number;
    startTime?: string;
    status?: number;
    title?: string;
    updateTime?: string;
    userId?: string;
  };

  type NotificationAddRequest = {
    content?: string;
    domain?: string[];
    endTime?: string;
    startTime?: string;
    status?: number;
    title?: string;
    userId?: string;
  };

  type NotificationEditRequest = {
    content?: string;
    domain?: string[];
    endTime?: string;
    id?: string;
    startTime?: string;
    status?: number;
    title?: string;
    userId?: string;
  };

  type NotificationQueryRequest = {
    content?: string;
    current?: string;
    domain?: string[];
    endTime?: string;
    id?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    startTime?: string;
    status?: number;
    title?: string;
    userId?: string;
  };

  type NotificationUpdateRequest = {
    content?: string;
    domain?: string[];
    endTime?: string;
    id?: string;
    startTime?: string;
    status?: number;
    title?: string;
    userId?: string;
  };

  type NotificationVO = {
    content?: string;
    id?: string;
    isDelete?: number;
    title?: string;
    updateTime?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageGenerator_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: Generator[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PageGeneratorVO_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: GeneratorVO[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PageNotification_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: Notification[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PageNotificationVO_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: NotificationVO[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PageUser_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: User[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PageUserVO_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: UserVO[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PostCommentRequest = {
    content?: string;
    generatorId?: string;
    rootId?: string;
    toCommentId?: string;
    toId?: string;
  };

  type RootCommentVo = {
    content?: string;
    createTime?: string;
    fromId?: string;
    fromUsername?: string;
    id?: string;
    likeCount?: number;
    replyCount?: number;
    userAvatar?: string;
  };

  type StarBookBoolVo = {
    count?: number;
    id?: string;
    isContain?: boolean;
    name?: string;
  };

  type StarBookQueryRequest = {
    bookId?: string;
    current?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
  };

  type starGeneratorUsingPOSTParams = {
    /** id */
    id: string;
  };

  type testDownloadFileUsingGETParams = {
    /** filepath */
    filepath?: string;
  };

  type unlikeGeneratorRedisUsingPOSTParams = {
    createBy?: string;
    createTime?: string;
    current?: string;
    generatorId?: string;
    id?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
  };

  type uploadFileUsingPOSTParams = {
    biz?: string;
  };

  type User = {
    accessKey?: string;
    createTime?: string;
    email?: string;
    id?: string;
    isDelete?: number;
    phone?: string;
    secretKey?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserAddRequest = {
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type UserBindEmailRequest = {
    captcha?: string;
    emailAccount?: string;
  };

  type UserBindPhoneRequest = {
    phone?: string;
  };

  type UserEmailLoginRequest = {
    captcha?: string;
    emailAccount?: string;
  };

  type UserEmailRegisterRequest = {
    agreeToAnAgreement?: string;
    captcha?: string;
    emailAccount?: string;
    userName?: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    current?: string;
    id?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    userAccount?: string;
    userName?: string;
    userPassword?: string;
  };

  type UserUnBindEmailRequest = {
    captcha?: string;
    emailAccount?: string;
  };

  type UserUpdateMyRequest = {
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
  };

  type UserUpdatePwdRequest = {
    newPassword?: string;
    originalPassword?: string;
  };

  type UserUpdateRequest = {
    id?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    accessKey?: string;
    createTime?: string;
    email?: string;
    id?: string;
    phone?: string;
    secretKey?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };
}
