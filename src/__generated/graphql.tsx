import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Uuid: any;
  bigint: any;
  citext: any;
  jsonb: any;
  numeric: any;
  timestamptz: any;
  uuid: any;
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type BigintComparisonExp = {
  _eq?: InputMaybe<Scalars['bigint']>;
  _gt?: InputMaybe<Scalars['bigint']>;
  _gte?: InputMaybe<Scalars['bigint']>;
  _in?: InputMaybe<Array<Scalars['bigint']>>;
  _isNull?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['bigint']>;
  _lte?: InputMaybe<Scalars['bigint']>;
  _neq?: InputMaybe<Scalars['bigint']>;
  _nin?: InputMaybe<Array<Scalars['bigint']>>;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type BooleanComparisonExp = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _gt?: InputMaybe<Scalars['Boolean']>;
  _gte?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _isNull?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Boolean']>;
  _lte?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']>>;
};

/** columns and relationships of "budgets" */
export type Budgets = {
  __typename?: 'Budgets';
  id: Scalars['uuid'];
  initialAmount: Scalars['numeric'];
  /** An object relationship */
  project?: Maybe<Projects>;
  projectId?: Maybe<Scalars['uuid']>;
  remainingAmount: Scalars['numeric'];
};

/** order by aggregate values of table "budgets" */
export type BudgetsAggregateOrderBy = {
  avg?: InputMaybe<Budgets_Avg_Order_By>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<Budgets_Max_Order_By>;
  min?: InputMaybe<Budgets_Min_Order_By>;
  stddev?: InputMaybe<Budgets_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Budgets_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Budgets_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Budgets_Sum_Order_By>;
  var_pop?: InputMaybe<Budgets_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Budgets_Var_Samp_Order_By>;
  variance?: InputMaybe<Budgets_Variance_Order_By>;
};

/** Boolean expression to filter rows from the table "budgets". All fields are combined with a logical 'AND'. */
export type BudgetsBoolExp = {
  _and?: InputMaybe<Array<BudgetsBoolExp>>;
  _not?: InputMaybe<BudgetsBoolExp>;
  _or?: InputMaybe<Array<BudgetsBoolExp>>;
  id?: InputMaybe<UuidComparisonExp>;
  initialAmount?: InputMaybe<NumericComparisonExp>;
  project?: InputMaybe<ProjectsBoolExp>;
  projectId?: InputMaybe<UuidComparisonExp>;
  remainingAmount?: InputMaybe<NumericComparisonExp>;
};

/** Ordering options when selecting data from "budgets". */
export type BudgetsOrderBy = {
  id?: InputMaybe<OrderBy>;
  initialAmount?: InputMaybe<OrderBy>;
  project?: InputMaybe<ProjectsOrderBy>;
  projectId?: InputMaybe<OrderBy>;
  remainingAmount?: InputMaybe<OrderBy>;
};

/** select columns of table "budgets" */
export enum BudgetsSelectColumn {
  /** column name */
  Id = 'id',
  /** column name */
  InitialAmount = 'initialAmount',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  RemainingAmount = 'remainingAmount'
}

/** Boolean expression to compare columns of type "citext". All fields are combined with logical 'AND'. */
export type CitextComparisonExp = {
  _eq?: InputMaybe<Scalars['citext']>;
  _gt?: InputMaybe<Scalars['citext']>;
  _gte?: InputMaybe<Scalars['citext']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['citext']>;
  _in?: InputMaybe<Array<Scalars['citext']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['citext']>;
  _isNull?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['citext']>;
  _lt?: InputMaybe<Scalars['citext']>;
  _lte?: InputMaybe<Scalars['citext']>;
  _neq?: InputMaybe<Scalars['citext']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['citext']>;
  _nin?: InputMaybe<Array<Scalars['citext']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['citext']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['citext']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['citext']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['citext']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['citext']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['citext']>;
};

/** ordering argument of a cursor */
export enum CursorOrdering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

export type JsonbCastExp = {
  String?: InputMaybe<StringComparisonExp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type JsonbComparisonExp = {
  _cast?: InputMaybe<JsonbCastExp>;
  /** is the column contained in the given json value */
  _containedIn?: InputMaybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']>;
  _eq?: InputMaybe<Scalars['jsonb']>;
  _gt?: InputMaybe<Scalars['jsonb']>;
  _gte?: InputMaybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _hasKey?: InputMaybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _hasKeysAll?: InputMaybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _hasKeysAny?: InputMaybe<Array<Scalars['String']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']>>;
  _isNull?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['jsonb']>;
  _lte?: InputMaybe<Scalars['jsonb']>;
  _neq?: InputMaybe<Scalars['jsonb']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']>>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type NumericComparisonExp = {
  _eq?: InputMaybe<Scalars['numeric']>;
  _gt?: InputMaybe<Scalars['numeric']>;
  _gte?: InputMaybe<Scalars['numeric']>;
  _in?: InputMaybe<Array<Scalars['numeric']>>;
  _isNull?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['numeric']>;
  _lte?: InputMaybe<Scalars['numeric']>;
  _neq?: InputMaybe<Scalars['numeric']>;
  _nin?: InputMaybe<Array<Scalars['numeric']>>;
};

/** column ordering options */
export enum OrderBy {
  /** in ascending order, nulls last */
  Asc = 'ASC',
  /** in ascending order, nulls first */
  AscNullsFirst = 'ASC_NULLS_FIRST',
  /** in ascending order, nulls last */
  AscNullsLast = 'ASC_NULLS_LAST',
  /** in descending order, nulls first */
  Desc = 'DESC',
  /** in descending order, nulls first */
  DescNullsFirst = 'DESC_NULLS_FIRST',
  /** in descending order, nulls last */
  DescNullsLast = 'DESC_NULLS_LAST'
}

/** columns and relationships of "payment_requests" */
export type PaymentRequests = {
  __typename?: 'PaymentRequests';
  amountInUsd: Scalars['bigint'];
  /** An object relationship */
  budget?: Maybe<Budgets>;
  budgetId: Scalars['uuid'];
  id: Scalars['uuid'];
  /** An array relationship */
  payments: Array<Payments>;
  reason: Scalars['jsonb'];
  /** An object relationship */
  recipient?: Maybe<Users>;
  recipientId: Scalars['uuid'];
  /** An object relationship */
  requestor?: Maybe<Users>;
  requestorId: Scalars['uuid'];
};


/** columns and relationships of "payment_requests" */
export type PaymentRequestsPaymentsArgs = {
  distinctOn?: InputMaybe<Array<PaymentsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<PaymentsOrderBy>>;
  where?: InputMaybe<PaymentsBoolExp>;
};


/** columns and relationships of "payment_requests" */
export type PaymentRequestsReasonArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "payment_requests". All fields are combined with a logical 'AND'. */
export type PaymentRequestsBoolExp = {
  _and?: InputMaybe<Array<PaymentRequestsBoolExp>>;
  _not?: InputMaybe<PaymentRequestsBoolExp>;
  _or?: InputMaybe<Array<PaymentRequestsBoolExp>>;
  amountInUsd?: InputMaybe<BigintComparisonExp>;
  budget?: InputMaybe<BudgetsBoolExp>;
  budgetId?: InputMaybe<UuidComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  payments?: InputMaybe<PaymentsBoolExp>;
  reason?: InputMaybe<JsonbComparisonExp>;
  recipient?: InputMaybe<UsersBoolExp>;
  recipientId?: InputMaybe<UuidComparisonExp>;
  requestor?: InputMaybe<UsersBoolExp>;
  requestorId?: InputMaybe<UuidComparisonExp>;
};

/** Ordering options when selecting data from "payment_requests". */
export type PaymentRequestsOrderBy = {
  amountInUsd?: InputMaybe<OrderBy>;
  budget?: InputMaybe<BudgetsOrderBy>;
  budgetId?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  paymentsAggregate?: InputMaybe<PaymentsAggregateOrderBy>;
  reason?: InputMaybe<OrderBy>;
  recipient?: InputMaybe<UsersOrderBy>;
  recipientId?: InputMaybe<OrderBy>;
  requestor?: InputMaybe<UsersOrderBy>;
  requestorId?: InputMaybe<OrderBy>;
};

/** select columns of table "payment_requests" */
export enum PaymentRequestsSelectColumn {
  /** column name */
  AmountInUsd = 'amountInUsd',
  /** column name */
  BudgetId = 'budgetId',
  /** column name */
  Id = 'id',
  /** column name */
  Reason = 'reason',
  /** column name */
  RecipientId = 'recipientId',
  /** column name */
  RequestorId = 'requestorId'
}

/** columns and relationships of "payments" */
export type Payments = {
  __typename?: 'Payments';
  amount: Scalars['numeric'];
  currencyCode: Scalars['String'];
  id: Scalars['uuid'];
  /** An object relationship */
  paymentRequest: PaymentRequests;
  receipt: Scalars['jsonb'];
  requestId: Scalars['uuid'];
};


/** columns and relationships of "payments" */
export type PaymentsReceiptArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** order by aggregate values of table "payments" */
export type PaymentsAggregateOrderBy = {
  avg?: InputMaybe<Payments_Avg_Order_By>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<Payments_Max_Order_By>;
  min?: InputMaybe<Payments_Min_Order_By>;
  stddev?: InputMaybe<Payments_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Payments_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Payments_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Payments_Sum_Order_By>;
  var_pop?: InputMaybe<Payments_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Payments_Var_Samp_Order_By>;
  variance?: InputMaybe<Payments_Variance_Order_By>;
};

/** Boolean expression to filter rows from the table "payments". All fields are combined with a logical 'AND'. */
export type PaymentsBoolExp = {
  _and?: InputMaybe<Array<PaymentsBoolExp>>;
  _not?: InputMaybe<PaymentsBoolExp>;
  _or?: InputMaybe<Array<PaymentsBoolExp>>;
  amount?: InputMaybe<NumericComparisonExp>;
  currencyCode?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  paymentRequest?: InputMaybe<PaymentRequestsBoolExp>;
  receipt?: InputMaybe<JsonbComparisonExp>;
  requestId?: InputMaybe<UuidComparisonExp>;
};

/** Ordering options when selecting data from "payments". */
export type PaymentsOrderBy = {
  amount?: InputMaybe<OrderBy>;
  currencyCode?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  paymentRequest?: InputMaybe<PaymentRequestsOrderBy>;
  receipt?: InputMaybe<OrderBy>;
  requestId?: InputMaybe<OrderBy>;
};

/** select columns of table "payments" */
export enum PaymentsSelectColumn {
  /** column name */
  Amount = 'amount',
  /** column name */
  CurrencyCode = 'currencyCode',
  /** column name */
  Id = 'id',
  /** column name */
  Receipt = 'receipt',
  /** column name */
  RequestId = 'requestId'
}

/** columns and relationships of "payout_settings" */
export type PayoutSettings = {
  __typename?: 'PayoutSettings';
  ethWalletAddress?: Maybe<Scalars['String']>;
  userId: Scalars['uuid'];
};

/** Boolean expression to filter rows from the table "payout_settings". All fields are combined with a logical 'AND'. */
export type PayoutSettingsBoolExp = {
  _and?: InputMaybe<Array<PayoutSettingsBoolExp>>;
  _not?: InputMaybe<PayoutSettingsBoolExp>;
  _or?: InputMaybe<Array<PayoutSettingsBoolExp>>;
  ethWalletAddress?: InputMaybe<StringComparisonExp>;
  userId?: InputMaybe<UuidComparisonExp>;
};

/** unique or primary key constraints on table "payout_settings" */
export enum PayoutSettingsConstraint {
  /** unique or primary key constraint on columns "user_id" */
  PayoutSettingsPkey = 'payout_settings_pkey'
}

/** input type for inserting data into table "payout_settings" */
export type PayoutSettingsInsertInput = {
  ethWalletAddress?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** response of any mutation on the table "payout_settings" */
export type PayoutSettingsMutationResponse = {
  __typename?: 'PayoutSettingsMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<PayoutSettings>;
};

/** on_conflict condition type for table "payout_settings" */
export type PayoutSettingsOnConflict = {
  constraint: PayoutSettingsConstraint;
  update_columns?: Array<PayoutSettingsUpdateColumn>;
  where?: InputMaybe<PayoutSettingsBoolExp>;
};

/** Ordering options when selecting data from "payout_settings". */
export type PayoutSettingsOrderBy = {
  ethWalletAddress?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: payout_settings */
export type PayoutSettingsPkColumnsInput = {
  userId: Scalars['uuid'];
};

/** select columns of table "payout_settings" */
export enum PayoutSettingsSelectColumn {
  /** column name */
  EthWalletAddress = 'ethWalletAddress',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "payout_settings" */
export type PayoutSettingsSetInput = {
  ethWalletAddress?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "payout_settings" */
export enum PayoutSettingsUpdateColumn {
  /** column name */
  EthWalletAddress = 'ethWalletAddress',
  /** column name */
  UserId = 'userId'
}

export type PayoutSettingsUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<PayoutSettingsSetInput>;
  where: PayoutSettingsBoolExp;
};

/** columns and relationships of "project_details" */
export type ProjectDetails = {
  __typename?: 'ProjectDetails';
  description?: Maybe<Scalars['String']>;
  projectId: Scalars['uuid'];
  telegramLink?: Maybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "project_details". All fields are combined with a logical 'AND'. */
export type ProjectDetailsBoolExp = {
  _and?: InputMaybe<Array<ProjectDetailsBoolExp>>;
  _not?: InputMaybe<ProjectDetailsBoolExp>;
  _or?: InputMaybe<Array<ProjectDetailsBoolExp>>;
  description?: InputMaybe<StringComparisonExp>;
  projectId?: InputMaybe<UuidComparisonExp>;
  telegramLink?: InputMaybe<StringComparisonExp>;
};

/** Ordering options when selecting data from "project_details". */
export type ProjectDetailsOrderBy = {
  description?: InputMaybe<OrderBy>;
  projectId?: InputMaybe<OrderBy>;
  telegramLink?: InputMaybe<OrderBy>;
};

/** select columns of table "project_details" */
export enum ProjectDetailsSelectColumn {
  /** column name */
  Description = 'description',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  TelegramLink = 'telegramLink'
}

/** columns and relationships of "project_leads" */
export type ProjectLeads = {
  __typename?: 'ProjectLeads';
  /** An object relationship */
  project: Projects;
  projectId: Scalars['uuid'];
  /** An object relationship */
  user?: Maybe<Users>;
  userId: Scalars['uuid'];
};

/** order by aggregate values of table "project_leads" */
export type ProjectLeadsAggregateOrderBy = {
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<Project_Leads_Max_Order_By>;
  min?: InputMaybe<Project_Leads_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "project_leads". All fields are combined with a logical 'AND'. */
export type ProjectLeadsBoolExp = {
  _and?: InputMaybe<Array<ProjectLeadsBoolExp>>;
  _not?: InputMaybe<ProjectLeadsBoolExp>;
  _or?: InputMaybe<Array<ProjectLeadsBoolExp>>;
  project?: InputMaybe<ProjectsBoolExp>;
  projectId?: InputMaybe<UuidComparisonExp>;
  user?: InputMaybe<UsersBoolExp>;
  userId?: InputMaybe<UuidComparisonExp>;
};

/** Ordering options when selecting data from "project_leads". */
export type ProjectLeadsOrderBy = {
  project?: InputMaybe<ProjectsOrderBy>;
  projectId?: InputMaybe<OrderBy>;
  user?: InputMaybe<UsersOrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** select columns of table "project_leads" */
export enum ProjectLeadsSelectColumn {
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  UserId = 'userId'
}

/** columns and relationships of "projects" */
export type Projects = {
  __typename?: 'Projects';
  /** An array relationship */
  budgets: Array<Budgets>;
  githubRepoId: Scalars['bigint'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  /** An object relationship */
  projectDetails?: Maybe<ProjectDetails>;
  /** An array relationship */
  projectLeads: Array<ProjectLeads>;
};


/** columns and relationships of "projects" */
export type ProjectsBudgetsArgs = {
  distinctOn?: InputMaybe<Array<BudgetsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<BudgetsOrderBy>>;
  where?: InputMaybe<BudgetsBoolExp>;
};


/** columns and relationships of "projects" */
export type ProjectsProjectLeadsArgs = {
  distinctOn?: InputMaybe<Array<ProjectLeadsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ProjectLeadsOrderBy>>;
  where?: InputMaybe<ProjectLeadsBoolExp>;
};

/** Boolean expression to filter rows from the table "projects". All fields are combined with a logical 'AND'. */
export type ProjectsBoolExp = {
  _and?: InputMaybe<Array<ProjectsBoolExp>>;
  _not?: InputMaybe<ProjectsBoolExp>;
  _or?: InputMaybe<Array<ProjectsBoolExp>>;
  budgets?: InputMaybe<BudgetsBoolExp>;
  githubRepoId?: InputMaybe<BigintComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
  projectDetails?: InputMaybe<ProjectDetailsBoolExp>;
  projectLeads?: InputMaybe<ProjectLeadsBoolExp>;
};

/** Ordering options when selecting data from "projects". */
export type ProjectsOrderBy = {
  budgetsAggregate?: InputMaybe<BudgetsAggregateOrderBy>;
  githubRepoId?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  projectDetails?: InputMaybe<ProjectDetailsOrderBy>;
  projectLeadsAggregate?: InputMaybe<ProjectLeadsAggregateOrderBy>;
};

/** select columns of table "projects" */
export enum ProjectsSelectColumn {
  /** column name */
  GithubRepoId = 'githubRepoId',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type StringComparisonExp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _isNull?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type TimestamptzComparisonExp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _isNull?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type UuidComparisonExp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _isNull?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};

/** order by avg() on columns of table "budgets" */
export type Budgets_Avg_Order_By = {
  initialAmount?: InputMaybe<OrderBy>;
  remainingAmount?: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "budgets" */
export type Budgets_Max_Order_By = {
  id?: InputMaybe<OrderBy>;
  initialAmount?: InputMaybe<OrderBy>;
  projectId?: InputMaybe<OrderBy>;
  remainingAmount?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "budgets" */
export type Budgets_Min_Order_By = {
  id?: InputMaybe<OrderBy>;
  initialAmount?: InputMaybe<OrderBy>;
  projectId?: InputMaybe<OrderBy>;
  remainingAmount?: InputMaybe<OrderBy>;
};

/** order by stddev() on columns of table "budgets" */
export type Budgets_Stddev_Order_By = {
  initialAmount?: InputMaybe<OrderBy>;
  remainingAmount?: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "budgets" */
export type Budgets_Stddev_Pop_Order_By = {
  initialAmount?: InputMaybe<OrderBy>;
  remainingAmount?: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "budgets" */
export type Budgets_Stddev_Samp_Order_By = {
  initialAmount?: InputMaybe<OrderBy>;
  remainingAmount?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "budgets" */
export type Budgets_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Budgets_StreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Budgets_StreamCursorValueInput = {
  id?: InputMaybe<Scalars['uuid']>;
  initialAmount?: InputMaybe<Scalars['numeric']>;
  projectId?: InputMaybe<Scalars['uuid']>;
  remainingAmount?: InputMaybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "budgets" */
export type Budgets_Sum_Order_By = {
  initialAmount?: InputMaybe<OrderBy>;
  remainingAmount?: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "budgets" */
export type Budgets_Var_Pop_Order_By = {
  initialAmount?: InputMaybe<OrderBy>;
  remainingAmount?: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "budgets" */
export type Budgets_Var_Samp_Order_By = {
  initialAmount?: InputMaybe<OrderBy>;
  remainingAmount?: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "budgets" */
export type Budgets_Variance_Order_By = {
  initialAmount?: InputMaybe<OrderBy>;
  remainingAmount?: InputMaybe<OrderBy>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "payout_settings" */
  deletePayoutSettings?: Maybe<PayoutSettingsMutationResponse>;
  /** delete single row from the table: "payout_settings" */
  deletePayoutSettingsByPk?: Maybe<PayoutSettings>;
  /** insert data into the table: "payout_settings" */
  insertPayoutSettings?: Maybe<PayoutSettingsMutationResponse>;
  /** insert a single row into the table: "payout_settings" */
  insertPayoutSettingsOne?: Maybe<PayoutSettings>;
  requestPayment: Scalars['Uuid'];
  /** update data of the table: "payout_settings" */
  updatePayoutSettings?: Maybe<PayoutSettingsMutationResponse>;
  /** update single row of the table: "payout_settings" */
  updatePayoutSettingsByPk?: Maybe<PayoutSettings>;
  /** update multiples rows of table: "payout_settings" */
  updatePayoutSettingsMany?: Maybe<Array<Maybe<PayoutSettingsMutationResponse>>>;
  /** update single row of the table: "auth.users" */
  updateUser?: Maybe<Users>;
  /** update data of the table: "auth.users" */
  updateUsers?: Maybe<UsersMutationResponse>;
  /** update multiples rows of table: "auth.users" */
  updateUsersMany?: Maybe<Array<Maybe<UsersMutationResponse>>>;
};


/** mutation root */
export type Mutation_RootDeletePayoutSettingsArgs = {
  where: PayoutSettingsBoolExp;
};


/** mutation root */
export type Mutation_RootDeletePayoutSettingsByPkArgs = {
  userId: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsertPayoutSettingsArgs = {
  objects: Array<PayoutSettingsInsertInput>;
  onConflict?: InputMaybe<PayoutSettingsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertPayoutSettingsOneArgs = {
  object: PayoutSettingsInsertInput;
  onConflict?: InputMaybe<PayoutSettingsOnConflict>;
};


/** mutation root */
export type Mutation_RootRequestPaymentArgs = {
  amountInUsd: Scalars['Int'];
  budgetId: Scalars['Uuid'];
  reason: Scalars['String'];
  recipientId: Scalars['Uuid'];
  requestorId: Scalars['Uuid'];
};


/** mutation root */
export type Mutation_RootUpdatePayoutSettingsArgs = {
  _set?: InputMaybe<PayoutSettingsSetInput>;
  where: PayoutSettingsBoolExp;
};


/** mutation root */
export type Mutation_RootUpdatePayoutSettingsByPkArgs = {
  _set?: InputMaybe<PayoutSettingsSetInput>;
  pk_columns: PayoutSettingsPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdatePayoutSettingsManyArgs = {
  updates: Array<PayoutSettingsUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateUserArgs = {
  _append?: InputMaybe<UsersAppendInput>;
  _deleteAtPath?: InputMaybe<UsersDeleteAtPathInput>;
  _deleteElem?: InputMaybe<UsersDeleteElemInput>;
  _deleteKey?: InputMaybe<UsersDeleteKeyInput>;
  _prepend?: InputMaybe<UsersPrependInput>;
  _set?: InputMaybe<UsersSetInput>;
  pk_columns: UsersPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateUsersArgs = {
  _append?: InputMaybe<UsersAppendInput>;
  _deleteAtPath?: InputMaybe<UsersDeleteAtPathInput>;
  _deleteElem?: InputMaybe<UsersDeleteElemInput>;
  _deleteKey?: InputMaybe<UsersDeleteKeyInput>;
  _prepend?: InputMaybe<UsersPrependInput>;
  _set?: InputMaybe<UsersSetInput>;
  where: UsersBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateUsersManyArgs = {
  updates: Array<UsersUpdates>;
};

/** Streaming cursor of the table "payment_requests" */
export type Payment_Requests_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Payment_Requests_StreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Payment_Requests_StreamCursorValueInput = {
  amountInUsd?: InputMaybe<Scalars['bigint']>;
  budgetId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  reason?: InputMaybe<Scalars['jsonb']>;
  recipientId?: InputMaybe<Scalars['uuid']>;
  requestorId?: InputMaybe<Scalars['uuid']>;
};

/** order by avg() on columns of table "payments" */
export type Payments_Avg_Order_By = {
  amount?: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "payments" */
export type Payments_Max_Order_By = {
  amount?: InputMaybe<OrderBy>;
  currencyCode?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  requestId?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "payments" */
export type Payments_Min_Order_By = {
  amount?: InputMaybe<OrderBy>;
  currencyCode?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  requestId?: InputMaybe<OrderBy>;
};

/** order by stddev() on columns of table "payments" */
export type Payments_Stddev_Order_By = {
  amount?: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "payments" */
export type Payments_Stddev_Pop_Order_By = {
  amount?: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "payments" */
export type Payments_Stddev_Samp_Order_By = {
  amount?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "payments" */
export type Payments_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Payments_StreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Payments_StreamCursorValueInput = {
  amount?: InputMaybe<Scalars['numeric']>;
  currencyCode?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  receipt?: InputMaybe<Scalars['jsonb']>;
  requestId?: InputMaybe<Scalars['uuid']>;
};

/** order by sum() on columns of table "payments" */
export type Payments_Sum_Order_By = {
  amount?: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "payments" */
export type Payments_Var_Pop_Order_By = {
  amount?: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "payments" */
export type Payments_Var_Samp_Order_By = {
  amount?: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "payments" */
export type Payments_Variance_Order_By = {
  amount?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "payout_settings" */
export type Payout_Settings_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Payout_Settings_StreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Payout_Settings_StreamCursorValueInput = {
  ethWalletAddress?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** Streaming cursor of the table "project_details" */
export type Project_Details_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Project_Details_StreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Project_Details_StreamCursorValueInput = {
  description?: InputMaybe<Scalars['String']>;
  projectId?: InputMaybe<Scalars['uuid']>;
  telegramLink?: InputMaybe<Scalars['String']>;
};

/** order by max() on columns of table "project_leads" */
export type Project_Leads_Max_Order_By = {
  projectId?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "project_leads" */
export type Project_Leads_Min_Order_By = {
  projectId?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "project_leads" */
export type Project_Leads_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Project_Leads_StreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Project_Leads_StreamCursorValueInput = {
  projectId?: InputMaybe<Scalars['uuid']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** Streaming cursor of the table "projects" */
export type Projects_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Projects_StreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Projects_StreamCursorValueInput = {
  githubRepoId?: InputMaybe<Scalars['bigint']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** An array relationship */
  budgets: Array<Budgets>;
  /** fetch data from the table: "budgets" using primary key columns */
  budgetsByPk?: Maybe<Budgets>;
  hello: Scalars['String'];
  /** fetch data from the table: "payment_requests" */
  paymentRequests: Array<PaymentRequests>;
  /** fetch data from the table: "payment_requests" using primary key columns */
  paymentRequestsByPk?: Maybe<PaymentRequests>;
  /** An array relationship */
  payments: Array<Payments>;
  /** fetch data from the table: "payments" using primary key columns */
  paymentsByPk?: Maybe<Payments>;
  /** fetch data from the table: "payout_settings" */
  payoutSettings: Array<PayoutSettings>;
  /** fetch data from the table: "payout_settings" using primary key columns */
  payoutSettingsByPk?: Maybe<PayoutSettings>;
  /** fetch data from the table: "project_details" */
  projectDetails: Array<ProjectDetails>;
  /** fetch data from the table: "project_details" using primary key columns */
  projectDetailsByPk?: Maybe<ProjectDetails>;
  /** An array relationship */
  projectLeads: Array<ProjectLeads>;
  /** fetch data from the table: "project_leads" using primary key columns */
  projectLeadsByPk?: Maybe<ProjectLeads>;
  /** fetch data from the table: "projects" */
  projects: Array<Projects>;
  /** fetch data from the table: "projects" using primary key columns */
  projectsByPk?: Maybe<Projects>;
  /** fetch data from the table: "auth.users" using primary key columns */
  user?: Maybe<Users>;
  /** fetch data from the table: "auth.users" */
  users: Array<Users>;
};


export type Query_RootBudgetsArgs = {
  distinctOn?: InputMaybe<Array<BudgetsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<BudgetsOrderBy>>;
  where?: InputMaybe<BudgetsBoolExp>;
};


export type Query_RootBudgetsByPkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootPaymentRequestsArgs = {
  distinctOn?: InputMaybe<Array<PaymentRequestsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<PaymentRequestsOrderBy>>;
  where?: InputMaybe<PaymentRequestsBoolExp>;
};


export type Query_RootPaymentRequestsByPkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootPaymentsArgs = {
  distinctOn?: InputMaybe<Array<PaymentsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<PaymentsOrderBy>>;
  where?: InputMaybe<PaymentsBoolExp>;
};


export type Query_RootPaymentsByPkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootPayoutSettingsArgs = {
  distinctOn?: InputMaybe<Array<PayoutSettingsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<PayoutSettingsOrderBy>>;
  where?: InputMaybe<PayoutSettingsBoolExp>;
};


export type Query_RootPayoutSettingsByPkArgs = {
  userId: Scalars['uuid'];
};


export type Query_RootProjectDetailsArgs = {
  distinctOn?: InputMaybe<Array<ProjectDetailsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ProjectDetailsOrderBy>>;
  where?: InputMaybe<ProjectDetailsBoolExp>;
};


export type Query_RootProjectDetailsByPkArgs = {
  projectId: Scalars['uuid'];
};


export type Query_RootProjectLeadsArgs = {
  distinctOn?: InputMaybe<Array<ProjectLeadsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ProjectLeadsOrderBy>>;
  where?: InputMaybe<ProjectLeadsBoolExp>;
};


export type Query_RootProjectLeadsByPkArgs = {
  projectId: Scalars['uuid'];
  userId: Scalars['uuid'];
};


export type Query_RootProjectsArgs = {
  distinctOn?: InputMaybe<Array<ProjectsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ProjectsOrderBy>>;
  where?: InputMaybe<ProjectsBoolExp>;
};


export type Query_RootProjectsByPkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootUserArgs = {
  id: Scalars['uuid'];
};


export type Query_RootUsersArgs = {
  distinctOn?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** An array relationship */
  budgets: Array<Budgets>;
  /** fetch data from the table: "budgets" using primary key columns */
  budgetsByPk?: Maybe<Budgets>;
  /** fetch data from the table in a streaming manner: "budgets" */
  budgetsStream: Array<Budgets>;
  /** fetch data from the table: "payment_requests" */
  paymentRequests: Array<PaymentRequests>;
  /** fetch data from the table: "payment_requests" using primary key columns */
  paymentRequestsByPk?: Maybe<PaymentRequests>;
  /** fetch data from the table in a streaming manner: "payment_requests" */
  paymentRequestsStream: Array<PaymentRequests>;
  /** An array relationship */
  payments: Array<Payments>;
  /** fetch data from the table: "payments" using primary key columns */
  paymentsByPk?: Maybe<Payments>;
  /** fetch data from the table in a streaming manner: "payments" */
  paymentsStream: Array<Payments>;
  /** fetch data from the table: "payout_settings" */
  payoutSettings: Array<PayoutSettings>;
  /** fetch data from the table: "payout_settings" using primary key columns */
  payoutSettingsByPk?: Maybe<PayoutSettings>;
  /** fetch data from the table in a streaming manner: "payout_settings" */
  payoutSettingsStream: Array<PayoutSettings>;
  /** fetch data from the table: "project_details" */
  projectDetails: Array<ProjectDetails>;
  /** fetch data from the table: "project_details" using primary key columns */
  projectDetailsByPk?: Maybe<ProjectDetails>;
  /** fetch data from the table in a streaming manner: "project_details" */
  projectDetailsStream: Array<ProjectDetails>;
  /** An array relationship */
  projectLeads: Array<ProjectLeads>;
  /** fetch data from the table: "project_leads" using primary key columns */
  projectLeadsByPk?: Maybe<ProjectLeads>;
  /** fetch data from the table in a streaming manner: "project_leads" */
  projectLeadsStream: Array<ProjectLeads>;
  /** fetch data from the table: "projects" */
  projects: Array<Projects>;
  /** fetch data from the table: "projects" using primary key columns */
  projectsByPk?: Maybe<Projects>;
  /** fetch data from the table in a streaming manner: "projects" */
  projectsStream: Array<Projects>;
  /** fetch data from the table: "auth.users" using primary key columns */
  user?: Maybe<Users>;
  /** fetch data from the table: "auth.users" */
  users: Array<Users>;
  /** fetch data from the table in a streaming manner: "auth.users" */
  usersStream: Array<Users>;
};


export type Subscription_RootBudgetsArgs = {
  distinctOn?: InputMaybe<Array<BudgetsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<BudgetsOrderBy>>;
  where?: InputMaybe<BudgetsBoolExp>;
};


export type Subscription_RootBudgetsByPkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootBudgetsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Budgets_StreamCursorInput>>;
  where?: InputMaybe<BudgetsBoolExp>;
};


export type Subscription_RootPaymentRequestsArgs = {
  distinctOn?: InputMaybe<Array<PaymentRequestsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<PaymentRequestsOrderBy>>;
  where?: InputMaybe<PaymentRequestsBoolExp>;
};


export type Subscription_RootPaymentRequestsByPkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootPaymentRequestsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Payment_Requests_StreamCursorInput>>;
  where?: InputMaybe<PaymentRequestsBoolExp>;
};


export type Subscription_RootPaymentsArgs = {
  distinctOn?: InputMaybe<Array<PaymentsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<PaymentsOrderBy>>;
  where?: InputMaybe<PaymentsBoolExp>;
};


export type Subscription_RootPaymentsByPkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootPaymentsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Payments_StreamCursorInput>>;
  where?: InputMaybe<PaymentsBoolExp>;
};


export type Subscription_RootPayoutSettingsArgs = {
  distinctOn?: InputMaybe<Array<PayoutSettingsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<PayoutSettingsOrderBy>>;
  where?: InputMaybe<PayoutSettingsBoolExp>;
};


export type Subscription_RootPayoutSettingsByPkArgs = {
  userId: Scalars['uuid'];
};


export type Subscription_RootPayoutSettingsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Payout_Settings_StreamCursorInput>>;
  where?: InputMaybe<PayoutSettingsBoolExp>;
};


export type Subscription_RootProjectDetailsArgs = {
  distinctOn?: InputMaybe<Array<ProjectDetailsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ProjectDetailsOrderBy>>;
  where?: InputMaybe<ProjectDetailsBoolExp>;
};


export type Subscription_RootProjectDetailsByPkArgs = {
  projectId: Scalars['uuid'];
};


export type Subscription_RootProjectDetailsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Project_Details_StreamCursorInput>>;
  where?: InputMaybe<ProjectDetailsBoolExp>;
};


export type Subscription_RootProjectLeadsArgs = {
  distinctOn?: InputMaybe<Array<ProjectLeadsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ProjectLeadsOrderBy>>;
  where?: InputMaybe<ProjectLeadsBoolExp>;
};


export type Subscription_RootProjectLeadsByPkArgs = {
  projectId: Scalars['uuid'];
  userId: Scalars['uuid'];
};


export type Subscription_RootProjectLeadsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Project_Leads_StreamCursorInput>>;
  where?: InputMaybe<ProjectLeadsBoolExp>;
};


export type Subscription_RootProjectsArgs = {
  distinctOn?: InputMaybe<Array<ProjectsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ProjectsOrderBy>>;
  where?: InputMaybe<ProjectsBoolExp>;
};


export type Subscription_RootProjectsByPkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootProjectsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Projects_StreamCursorInput>>;
  where?: InputMaybe<ProjectsBoolExp>;
};


export type Subscription_RootUserArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootUsersArgs = {
  distinctOn?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type Subscription_RootUsersStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Users_StreamCursorInput>>;
  where?: InputMaybe<UsersBoolExp>;
};

/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type Users = {
  __typename?: 'users';
  activeMfaType?: Maybe<Scalars['String']>;
  avatarUrl: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  defaultRole: Scalars['String'];
  disabled: Scalars['Boolean'];
  displayName: Scalars['String'];
  email?: Maybe<Scalars['citext']>;
  emailVerified: Scalars['Boolean'];
  id: Scalars['uuid'];
  isAnonymous: Scalars['Boolean'];
  locale: Scalars['String'];
  metadata?: Maybe<Scalars['jsonb']>;
  newEmail?: Maybe<Scalars['citext']>;
  /** An object relationship */
  payoutSettings?: Maybe<PayoutSettings>;
  phoneNumber?: Maybe<Scalars['String']>;
  phoneNumberVerified: Scalars['Boolean'];
  /** An array relationship */
  projects_leaded: Array<ProjectLeads>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersMetadataArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersProjects_LeadedArgs = {
  distinctOn?: InputMaybe<Array<ProjectLeadsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ProjectLeadsOrderBy>>;
  where?: InputMaybe<ProjectLeadsBoolExp>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type UsersAppendInput = {
  metadata?: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "auth.users". All fields are combined with a logical 'AND'. */
export type UsersBoolExp = {
  _and?: InputMaybe<Array<UsersBoolExp>>;
  _not?: InputMaybe<UsersBoolExp>;
  _or?: InputMaybe<Array<UsersBoolExp>>;
  activeMfaType?: InputMaybe<StringComparisonExp>;
  avatarUrl?: InputMaybe<StringComparisonExp>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  defaultRole?: InputMaybe<StringComparisonExp>;
  disabled?: InputMaybe<BooleanComparisonExp>;
  displayName?: InputMaybe<StringComparisonExp>;
  email?: InputMaybe<CitextComparisonExp>;
  emailVerified?: InputMaybe<BooleanComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  isAnonymous?: InputMaybe<BooleanComparisonExp>;
  locale?: InputMaybe<StringComparisonExp>;
  metadata?: InputMaybe<JsonbComparisonExp>;
  newEmail?: InputMaybe<CitextComparisonExp>;
  payoutSettings?: InputMaybe<PayoutSettingsBoolExp>;
  phoneNumber?: InputMaybe<StringComparisonExp>;
  phoneNumberVerified?: InputMaybe<BooleanComparisonExp>;
  projects_leaded?: InputMaybe<ProjectLeadsBoolExp>;
};

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type UsersDeleteAtPathInput = {
  metadata?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type UsersDeleteElemInput = {
  metadata?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type UsersDeleteKeyInput = {
  metadata?: InputMaybe<Scalars['String']>;
};

/** response of any mutation on the table "auth.users" */
export type UsersMutationResponse = {
  __typename?: 'usersMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** Ordering options when selecting data from "auth.users". */
export type UsersOrderBy = {
  activeMfaType?: InputMaybe<OrderBy>;
  avatarUrl?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  defaultRole?: InputMaybe<OrderBy>;
  disabled?: InputMaybe<OrderBy>;
  displayName?: InputMaybe<OrderBy>;
  email?: InputMaybe<OrderBy>;
  emailVerified?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  isAnonymous?: InputMaybe<OrderBy>;
  locale?: InputMaybe<OrderBy>;
  metadata?: InputMaybe<OrderBy>;
  newEmail?: InputMaybe<OrderBy>;
  payoutSettings?: InputMaybe<PayoutSettingsOrderBy>;
  phoneNumber?: InputMaybe<OrderBy>;
  phoneNumberVerified?: InputMaybe<OrderBy>;
  projects_leadedAggregate?: InputMaybe<ProjectLeadsAggregateOrderBy>;
};

/** primary key columns input for table: auth.users */
export type UsersPkColumnsInput = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type UsersPrependInput = {
  metadata?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "auth.users" */
export enum UsersSelectColumn {
  /** column name */
  ActiveMfaType = 'activeMfaType',
  /** column name */
  AvatarUrl = 'avatarUrl',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DefaultRole = 'defaultRole',
  /** column name */
  Disabled = 'disabled',
  /** column name */
  DisplayName = 'displayName',
  /** column name */
  Email = 'email',
  /** column name */
  EmailVerified = 'emailVerified',
  /** column name */
  Id = 'id',
  /** column name */
  IsAnonymous = 'isAnonymous',
  /** column name */
  Locale = 'locale',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  NewEmail = 'newEmail',
  /** column name */
  PhoneNumber = 'phoneNumber',
  /** column name */
  PhoneNumberVerified = 'phoneNumberVerified'
}

/** input type for updating data in table "auth.users" */
export type UsersSetInput = {
  email?: InputMaybe<Scalars['citext']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
};

export type UsersUpdates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<UsersAppendInput>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _deleteAtPath?: InputMaybe<UsersDeleteAtPathInput>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _deleteElem?: InputMaybe<UsersDeleteElemInput>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _deleteKey?: InputMaybe<UsersDeleteKeyInput>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<UsersPrependInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<UsersSetInput>;
  where: UsersBoolExp;
};

/** Streaming cursor of the table "users" */
export type Users_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Users_StreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Users_StreamCursorValueInput = {
  activeMfaType?: InputMaybe<Scalars['String']>;
  avatarUrl?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  defaultRole?: InputMaybe<Scalars['String']>;
  disabled?: InputMaybe<Scalars['Boolean']>;
  displayName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['citext']>;
  emailVerified?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['uuid']>;
  isAnonymous?: InputMaybe<Scalars['Boolean']>;
  locale?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  newEmail?: InputMaybe<Scalars['citext']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  phoneNumberVerified?: InputMaybe<Scalars['Boolean']>;
};

export type GetMyContributionsQueryVariables = Exact<{
  userId: Scalars['uuid'];
}>;


export type GetMyContributionsQuery = { __typename?: 'query_root', paymentRequests: Array<{ __typename?: 'PaymentRequests', id: any, amountInUsd: any, payments: Array<{ __typename?: 'Payments', amount: any, currencyCode: string }>, budget?: { __typename?: 'Budgets', project?: { __typename?: 'Projects', id: any, name: string, projectDetails?: { __typename?: 'ProjectDetails', description?: string | null } | null } | null } | null }> };

export type MyProjectQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type MyProjectQuery = { __typename?: 'query_root', projectsByPk?: { __typename?: 'Projects', name: string, budgets: Array<{ __typename?: 'Budgets', initialAmount: any, remainingAmount: any }>, projectDetails?: { __typename?: 'ProjectDetails', description?: string | null, telegramLink?: string | null } | null } | null };

export type UpdateUserProfileMutationVariables = Exact<{
  userId: Scalars['uuid'];
  email: Scalars['citext'];
  metadata: Scalars['jsonb'];
}>;


export type UpdateUserProfileMutation = { __typename?: 'mutation_root', updateUser?: { __typename?: 'users', metadata?: any | null, email?: any | null } | null };

export type ProfileQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type ProfileQuery = { __typename?: 'query_root', user?: { __typename?: 'users', id: any, email?: any | null, metadata?: any | null } | null };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', id: any, displayName: string }> };

export type RequestNewPaymentMutationVariables = Exact<{
  amount: Scalars['Int'];
  contributorId: Scalars['Uuid'];
  budgetId: Scalars['Uuid'];
  requestorId: Scalars['Uuid'];
}>;


export type RequestNewPaymentMutation = { __typename?: 'mutation_root', requestPayment: any };

export type GetProjectAsPublicQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetProjectAsPublicQuery = { __typename?: 'query_root', projectsByPk?: { __typename?: 'Projects', name: string, projectDetails?: { __typename?: 'ProjectDetails', description?: string | null, telegramLink?: string | null } | null } | null };

export type GetProjectAsUserQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetProjectAsUserQuery = { __typename?: 'query_root', projectsByPk?: { __typename?: 'Projects', name: string, budgets: Array<{ __typename?: 'Budgets', id: any, initialAmount: any, remainingAmount: any }>, projectDetails?: { __typename?: 'ProjectDetails', description?: string | null, telegramLink?: string | null } | null } | null };

export type MyQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type MyQueryQuery = { __typename?: 'query_root', projects: Array<{ __typename?: 'Projects', id: any, name: string, projectDetails?: { __typename?: 'ProjectDetails', description?: string | null, telegramLink?: string | null } | null }> };


export const GetMyContributionsDocument = gql`
    query GetMyContributions($userId: uuid!) {
  paymentRequests(where: {recipientId: {_eq: $userId}}) {
    id
    payments {
      amount
      currencyCode
    }
    amountInUsd
    budget {
      project {
        id
        name
        projectDetails {
          description
        }
      }
    }
  }
}
    `;

/**
 * __useGetMyContributionsQuery__
 *
 * To run a query within a React component, call `useGetMyContributionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyContributionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyContributionsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetMyContributionsQuery(baseOptions: Apollo.QueryHookOptions<GetMyContributionsQuery, GetMyContributionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyContributionsQuery, GetMyContributionsQueryVariables>(GetMyContributionsDocument, options);
      }
export function useGetMyContributionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyContributionsQuery, GetMyContributionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyContributionsQuery, GetMyContributionsQueryVariables>(GetMyContributionsDocument, options);
        }
export type GetMyContributionsQueryHookResult = ReturnType<typeof useGetMyContributionsQuery>;
export type GetMyContributionsLazyQueryHookResult = ReturnType<typeof useGetMyContributionsLazyQuery>;
export type GetMyContributionsQueryResult = Apollo.QueryResult<GetMyContributionsQuery, GetMyContributionsQueryVariables>;
export const MyProjectDocument = gql`
    query MyProject($id: uuid!) {
  projectsByPk(id: $id) {
    name
    budgets {
      initialAmount
      remainingAmount
    }
    projectDetails {
      description
      telegramLink
    }
  }
}
    `;

/**
 * __useMyProjectQuery__
 *
 * To run a query within a React component, call `useMyProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMyProjectQuery(baseOptions: Apollo.QueryHookOptions<MyProjectQuery, MyProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyProjectQuery, MyProjectQueryVariables>(MyProjectDocument, options);
      }
export function useMyProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyProjectQuery, MyProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyProjectQuery, MyProjectQueryVariables>(MyProjectDocument, options);
        }
export type MyProjectQueryHookResult = ReturnType<typeof useMyProjectQuery>;
export type MyProjectLazyQueryHookResult = ReturnType<typeof useMyProjectLazyQuery>;
export type MyProjectQueryResult = Apollo.QueryResult<MyProjectQuery, MyProjectQueryVariables>;
export const UpdateUserProfileDocument = gql`
    mutation UpdateUserProfile($userId: uuid!, $email: citext!, $metadata: jsonb!) {
  updateUser(
    pk_columns: {id: $userId}
    _set: {email: $email, metadata: $metadata}
  ) {
    metadata
    email
  }
}
    `;
export type UpdateUserProfileMutationFn = Apollo.MutationFunction<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;

/**
 * __useUpdateUserProfileMutation__
 *
 * To run a mutation, you first call `useUpdateUserProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserProfileMutation, { data, loading, error }] = useUpdateUserProfileMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      email: // value for 'email'
 *      metadata: // value for 'metadata'
 *   },
 * });
 */
export function useUpdateUserProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>(UpdateUserProfileDocument, options);
      }
export type UpdateUserProfileMutationHookResult = ReturnType<typeof useUpdateUserProfileMutation>;
export type UpdateUserProfileMutationResult = Apollo.MutationResult<UpdateUserProfileMutation>;
export type UpdateUserProfileMutationOptions = Apollo.BaseMutationOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;
export const ProfileDocument = gql`
    query Profile($id: uuid!) {
  user(id: $id) {
    id
    email
    metadata
  }
}
    `;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProfileQuery(baseOptions: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
export const GetUsersDocument = gql`
    query getUsers {
  users {
    id
    displayName
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const RequestNewPaymentDocument = gql`
    mutation requestNewPayment($amount: Int!, $contributorId: Uuid!, $budgetId: Uuid!, $requestorId: Uuid!) {
  requestPayment(
    amountInUsd: $amount
    budgetId: $budgetId
    reason: "{}"
    recipientId: $contributorId
    requestorId: $requestorId
  )
}
    `;
export type RequestNewPaymentMutationFn = Apollo.MutationFunction<RequestNewPaymentMutation, RequestNewPaymentMutationVariables>;

/**
 * __useRequestNewPaymentMutation__
 *
 * To run a mutation, you first call `useRequestNewPaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestNewPaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestNewPaymentMutation, { data, loading, error }] = useRequestNewPaymentMutation({
 *   variables: {
 *      amount: // value for 'amount'
 *      contributorId: // value for 'contributorId'
 *      budgetId: // value for 'budgetId'
 *      requestorId: // value for 'requestorId'
 *   },
 * });
 */
export function useRequestNewPaymentMutation(baseOptions?: Apollo.MutationHookOptions<RequestNewPaymentMutation, RequestNewPaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestNewPaymentMutation, RequestNewPaymentMutationVariables>(RequestNewPaymentDocument, options);
      }
export type RequestNewPaymentMutationHookResult = ReturnType<typeof useRequestNewPaymentMutation>;
export type RequestNewPaymentMutationResult = Apollo.MutationResult<RequestNewPaymentMutation>;
export type RequestNewPaymentMutationOptions = Apollo.BaseMutationOptions<RequestNewPaymentMutation, RequestNewPaymentMutationVariables>;
export const GetProjectAsPublicDocument = gql`
    query getProjectAsPublic($id: uuid!) {
  projectsByPk(id: $id) {
    name
    projectDetails {
      description
      telegramLink
    }
  }
}
    `;

/**
 * __useGetProjectAsPublicQuery__
 *
 * To run a query within a React component, call `useGetProjectAsPublicQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectAsPublicQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectAsPublicQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProjectAsPublicQuery(baseOptions: Apollo.QueryHookOptions<GetProjectAsPublicQuery, GetProjectAsPublicQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectAsPublicQuery, GetProjectAsPublicQueryVariables>(GetProjectAsPublicDocument, options);
      }
export function useGetProjectAsPublicLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectAsPublicQuery, GetProjectAsPublicQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectAsPublicQuery, GetProjectAsPublicQueryVariables>(GetProjectAsPublicDocument, options);
        }
export type GetProjectAsPublicQueryHookResult = ReturnType<typeof useGetProjectAsPublicQuery>;
export type GetProjectAsPublicLazyQueryHookResult = ReturnType<typeof useGetProjectAsPublicLazyQuery>;
export type GetProjectAsPublicQueryResult = Apollo.QueryResult<GetProjectAsPublicQuery, GetProjectAsPublicQueryVariables>;
export const GetProjectAsUserDocument = gql`
    query getProjectAsUser($id: uuid!) {
  projectsByPk(id: $id) {
    name
    budgets {
      id
      initialAmount
      remainingAmount
    }
    projectDetails {
      description
      telegramLink
    }
  }
}
    `;

/**
 * __useGetProjectAsUserQuery__
 *
 * To run a query within a React component, call `useGetProjectAsUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectAsUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectAsUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProjectAsUserQuery(baseOptions: Apollo.QueryHookOptions<GetProjectAsUserQuery, GetProjectAsUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectAsUserQuery, GetProjectAsUserQueryVariables>(GetProjectAsUserDocument, options);
      }
export function useGetProjectAsUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectAsUserQuery, GetProjectAsUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectAsUserQuery, GetProjectAsUserQueryVariables>(GetProjectAsUserDocument, options);
        }
export type GetProjectAsUserQueryHookResult = ReturnType<typeof useGetProjectAsUserQuery>;
export type GetProjectAsUserLazyQueryHookResult = ReturnType<typeof useGetProjectAsUserLazyQuery>;
export type GetProjectAsUserQueryResult = Apollo.QueryResult<GetProjectAsUserQuery, GetProjectAsUserQueryVariables>;
export const MyQueryDocument = gql`
    query MyQuery {
  projects {
    id
    name
    projectDetails {
      description
      telegramLink
    }
  }
}
    `;

/**
 * __useMyQueryQuery__
 *
 * To run a query within a React component, call `useMyQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyQueryQuery(baseOptions?: Apollo.QueryHookOptions<MyQueryQuery, MyQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyQueryQuery, MyQueryQueryVariables>(MyQueryDocument, options);
      }
export function useMyQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyQueryQuery, MyQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyQueryQuery, MyQueryQueryVariables>(MyQueryDocument, options);
        }
export type MyQueryQueryHookResult = ReturnType<typeof useMyQueryQuery>;
export type MyQueryLazyQueryHookResult = ReturnType<typeof useMyQueryLazyQuery>;
export type MyQueryQueryResult = Apollo.QueryResult<MyQueryQuery, MyQueryQueryVariables>;