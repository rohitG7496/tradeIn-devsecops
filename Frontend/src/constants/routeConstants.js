// UNAUTH
export const UNAUTH_HOME_PATH = "/";
export const UNAUTH_LOGIN_PATH = "/";
export const UNAUTH_SIGNUP_PATH = "/";

//AUTH
export const AUTH_HOME_PATH = "/home";
export const AUTH_BUY_PATH = "/buy";
export const AUTH_DONATE_PATH = "/donate";
export const AUTH_EXCHANGE_PATH = "/exchange";

export const AUTH_DONATE_FILTERS = "/buy/filters";


export const AUTH_ACCOUNT_PATH = "/account/:id";
export const AUTH_ACCOUNT_SELL_PATH = "/account/:id/sell";
export const AUTH_ACCOUNT_DONATE_PATH = "/account/:id/donate";
export const AUTH_ACCOUNT_EXCHANGE_PATH = "/account/:id/exchange";
export const AUTH_ACCOUNT_ORDER_PATH = "/account/:id/orders";
export const AUTH_ACCOUNT_RESERVE_PATH = "/account/:id/reserves";
export const AUTH_ACCOUNT_WISHLIST_PATH = "/account/:id/wishlist";
export const AUTH_ACCOUNT_ADDRESS_PATH = "/account/:id/address";
export const AUTH_ACCOUNT_ADDRESS_EDIT_PATH = "/account/:id/address/edit";
export const AUTH_ORDERSUMMARY_PATH = "/account/:id/orders/:orderid";


export const AUTH_BUY_FULL_PATH = "/buy/:id(\\d+)";
export const AUTH_BUY_FULL_DELETE_PATH = "/buy/:id(\\d+)/delete";
export const AUTH_BUY_FULL_QUESTION_PATH = "/buy/:id(\\d+)/ask";

export const AUTH_DONATE_FULL_PATH = "/donate/:id(\\d+)";
export const AUTH_DONATE_FULL_DELETE_PATH = "/donate/:id(\\d+)/delete";
export const AUTH_DONATE_FULL_QUESTION_PATH = "/donate/:id(\\d+)/ask";

export const AUTH_EXCHANGE_FULL_PATH = "/exchange/:id(\\d+)";
export const AUTH_EXCHANGE_FULL_DELETE_PATH = "/exchange/:id(\\d+)/delete";
export const AUTH_EXCHANGE_FULL_QUESTION_PATH = "/exchange/:id(\\d+)/ask";


export const AUTH_SELL_PRODUCT ="/sellproduct";
export const AUTH_DONATE_PRODUCT ="/donateproduct";
export const AUTH_EXCHANGE_PRODUCT ="/exchangeproduct";

export const AUTH_BUY_EDIT_PATH = "/buy/:id(\\d+)/edit";
export const AUTH_DONATE_EDIT_PATH = "/donate/:id(\\d+)/edit";
export const AUTH_EXCHANGE_EDIT_PATH = "/exchange/:id(\\d+)/edit";

