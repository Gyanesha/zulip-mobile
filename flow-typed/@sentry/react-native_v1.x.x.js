declare module '@sentry/react-native' {
  // Adapted from @sentry/types/src/options.ts et al.
  //
  // Despite being given as exact, many other options not listed here are
  // available. See:
  // * https://github.com/getsentry/sentry-react-native/blob/ca0a3121b/src/js/backend.ts
  // * https://github.com/getsentry/sentry-javascript/blob/f4e59bcdd/packages/browser/src/backend.ts
  // * https://github.com/getsentry/sentry-javascript/blob/f4e59bcdd/packages/types/src/options.ts
  //
  // Please add them to this declaration as (and if) they're needed.
  declare export type Options = {|
    /* Do not use this in Sentry.init(). As of 1.0.9, Sentry will only be
       partially initialized if it's set to `false`, and anyway there's no good
       way to toggle it. */
    // enabled?: boolean,

    /* This field is declared as optional in TypeScript, but it's not: the iOS
       implementation will redbox if it's omitted from the `init()` call. The
       underlying issue has been filed as sentry/sentry-cocoa#347.

       In the meantime, { dsn: 'https://none@localhost:0/_/_' } may have the
       same effect. */
    dsn: string,

    ignoreErrors?: Array<string | RegExp>,
  |};

  // Adapted from @sentry/types/src/severity.ts.
  //
  // Flow doesn't support true enums, so we split the TypeScript `enum Severity`
  // into a separate variable `Severity` and type `SeverityType`.
  declare export var Severity: $ReadOnly<{
    Fatal: 'fatal',
    Error: 'error',
    Warning: 'warning',
    Log: 'log',
    Info: 'info',
    Debug: 'debug',
    Critical: 'critical',
  }>;
  declare export type SeverityType = $Values<typeof Severity>;

  // Taken from @sentry/types/src/event.ts.
  //
  // Commented-out members have types not (yet?) present in this file.
  declare export type Event = {|
    event_id?: string,
    message?: string,
    timestamp?: number,
    level?: SeverityType,
    platform?: string,
    logger?: string,
    server_name?: string,
    release?: string,
    dist?: string,
    environment?: string,
    // sdk?: SdkInfo,
    // request?: Request,
    transaction?: string,
    modules?: { [key: string]: string },
    fingerprint?: string[],
    // exception?: { values?: Exception[], },
    // stacktrace?: Stacktrace,
    breadcrumbs?: Breadcrumb[],
    // contexts?: { [key: string]: object },
    tags?: { [key: string]: string },
    extra?: { [key: string]: any },
    // user?: User,
    type?: EventType,
  |};

  // Taken from @sentry/types/src/event.ts.
  declare export type EventType = 'none';

  // Taken from @sentry/types/src/event.ts.
  declare export type EventHint = {|
    event_id?: string,
    syntheticException?: Error | null,
    originalException?: Error | string | null,
    data?: mixed,
  |};

  // Taken from @sentry/types/src/breadcrumb.ts.
  declare export type Breadcrumb = {|
    type?: string,
    level?: SeverityType,
    event_id?: string,
    category?: string,
    message?: string,
    data?: any,
    timestamp?: number,
  |};

  // Taken from @sentry/types/src/hub.ts. More methods are available.
  declare export type Hub = {
    getClient(): Client | typeof undefined,

    captureException(exception: mixed, hint?: EventHint): string,
    captureMessage(message: string, level?: SeverityType, eventHint?: EventHint): string,
  };

  // Adapted from @sentry/types/src/client.ts, with some specialization.
  declare export type Client = {
    getOptions(): Options,
  };

  // Adapted from @sentry/react-native/src/sdk.ts.
  declare export function init(o: Options): void;

  // Taken from @sentry/react-native/src/sdk.ts.
  declare export function getCurrentHub(): Hub;

  // A slice of the so-called "Static API":
  // https://docs.sentry.io/development/sdk-dev/unified-api/#static-api
  //
  // Taken from @sentry/minimal/src/index.ts.
  declare export function captureException(exception: mixed): string;
  declare export function captureMessage(message: string, level?: $Values<typeof Severity>): string;
  declare export function addBreadcrumb(breadcrumb: Breadcrumb): void;
}
