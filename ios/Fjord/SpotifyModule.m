/*
 * A react-native native modules exposing the Spotify SDK Auth features.
 * Based on the code provided by Giannis in a comment on this Stackoverflow thread:
 * https://stackoverflow.com/questions/41682991/reactnative-ios-spotify-sdk
 */

#import "SpotifyModule.h"
#import "React/RCTLog.h"
#import "React/RCTBridge.h"


@implementation SpotifyModule

/*
 * Exposes the module to react-native.
 * Accessible through NativeModules.SpotifyModule
 */
RCT_EXPORT_MODULE()


+ (id)sharedManager {
  static SpotifyModule *sharedManager = nil;
  @synchronized(self) {
    if (sharedManager == nil)
      sharedManager = [[self alloc] init];
  }
  return sharedManager;
}

// Exposes the 'authenticate' method to React Native
RCT_EXPORT_METHOD(authenticate:(RCTResponseSenderBlock)callback)
{
  /*
   * Sets everything up
   */
  
  // The spotify client id
  [[SPTAuth defaultInstance] setClientID:@"d2419f567d224eacbafe2bae5e73e046"];
  
  // The callback (called Custom URL Scheme in XCode project configuration)
  [[SPTAuth defaultInstance] setRedirectURL:[NSURL URLWithString:@"my-app-auth://spotify"]];

  // The scope request for the token
  [[SPTAuth defaultInstance] setRequestedScopes:@[SPTAuthUserReadPrivateScope, SPTAuthUserReadEmailScope, SPTAuthUserFollowReadScope, SPTAuthStreamingScope]];

  // OPTIONAL. Allows retrieval of refresheable tokens. If not specified, it uses the 'Implicit Grant' auth workflow
  [[SPTAuth defaultInstance] setTokenSwapURL: [NSURL URLWithString:@"http://10.1.10.171:8888/tokenSwap"]];
  
  /*
   * Creates and opens a Spotify Auth Webview
   */
  
  // Construct a login URL and open it
  NSURL *loginURL = [[SPTAuth defaultInstance] spotifyWebAuthenticationURL];
  
  
  
  //save the login callback
  SpotifyModule *spotifyModule = (SpotifyModule *)[SpotifyModule sharedManager];
  spotifyModule.loginCallback = callback;
  spotifyModule.player = [SPTAudioStreamingController sharedInstance];
  
  NSError *audioStreamingInitError;
  NSAssert([spotifyModule.player startWithClientId:@"d2419f567d224eacbafe2bae5e73e046" error:&audioStreamingInitError],
             @"There was a problem starting the Spotify SDK: %@", audioStreamingInitError.description);
  //setup event dispatcher
  spotifyModule.eventDispatcher = [[RCTEventDispatcher alloc] init];
  [spotifyModule.eventDispatcher setValue:self.bridge forKey:@"bridge"];
  
  RCTLogInfo(@"%@", loginURL);
  NSString *authcode = @"BQBcsIeO1-BfOV6y-tmNVJSQYYT8LRA8q0wHK3ZJ3bDMFAdIlps8i2hO5FLgov_q-LGHf8wdm5G6rnW8PYdL1q8VNfQjXOaJl7PuA7PLGOdwu0aAgD1hWNdN_Dj8BQmNNbi1ceEDvxJhUACvE6XIF7vFpGtMFnEk9q3oJEwXun-q4HyPUUuAJ531Zsne_EBffaQm1aau4oAORAWyKjv7xvz7fjE7bZor0wL6byqdU2Md4V-7ypCriJlpJTIz7pbE2iNQ5aLkbA";
  RCTLogInfo(@"%@", authcode);
  spotifyModule.player.delegate = spotifyModule;
  //[spotifyModule.player loginWithAccessToken:authcode];
  //spotifyModule.loginCallback(@[]);
  
  // Opening a URL in Safari close to application launch may trigger
  // an iOS bug, so we wait a bit before doing so.
  [[UIApplication sharedApplication] openURL:loginURL];
}


RCT_EXPORT_METHOD(playSong:(NSString *)uri)
{
    RCTLogInfo(@"Playing Song");
    RCTLogInfo(@"%@", uri);
    SpotifyModule *spotifyModule = (SpotifyModule *)[SpotifyModule sharedManager];
    [spotifyModule.player playSpotifyURI:uri startingWithIndex:0 startingWithPosition:0 callback:^(NSError *error) {
        if (error != nil) {
            NSLog(@"*** failed to play: %@", error);
            return;
        }
    }];

}

RCT_EXPORT_METHOD(playPlaylist:(NSArray *)uris)
{
    RCTLogInfo(@"Playing Song");
    RCTLogInfo(@"%@", uris[0]);
  
    SpotifyModule *spotifyModule = (SpotifyModule *)[SpotifyModule sharedManager];
    [spotifyModule.player playSpotifyURI:uris[0][2] startingWithIndex:0 startingWithPosition:0 callback:^(NSError *error) {
        if (error != nil) {
            NSLog(@"*** failed to play: %@", error);
            return;
        }
      }];
    for (int i = 1; i < [uris count]; i++) {
      [NSThread sleepForTimeInterval:.5];
      [spotifyModule.player queueSpotifyURI:uris[i][2] callback:^(NSError *error) {
        if (error != nil) {
            NSLog(@"*** failed to play: %@", error);
            return;
        }
      }];
    }

}

RCT_EXPORT_METHOD(play)
{
    RCTLogInfo(@"Play");
  
    SpotifyModule *spotifyModule = (SpotifyModule *)[SpotifyModule sharedManager];
    [spotifyModule.player setIsPlaying:YES callback:^(NSError *error) {
        if (error != nil) {
            NSLog(@"*** failed to resume play: %@", error);
            return;
        }
      }];
}

RCT_EXPORT_METHOD(pause)
{
    RCTLogInfo(@"Pause");
  
    SpotifyModule *spotifyModule = (SpotifyModule *)[SpotifyModule sharedManager];
    [spotifyModule.player setIsPlaying:NO callback:^(NSError *error) {
        if (error != nil) {
            NSLog(@"*** failed to resume pause: %@", error);
            return;
        }
      }];
}

RCT_EXPORT_METHOD(skipForward)
{
    RCTLogInfo(@"SkipForward");
  
    SpotifyModule *spotifyModule = (SpotifyModule *)[SpotifyModule sharedManager];
    [spotifyModule.player skipNext:^(NSError *error) {
        if (error != nil) {
            NSLog(@"*** failed to resume pause: %@", error);
            return;
        }
      }];
}

RCT_EXPORT_METHOD(skipBackward)
{
    RCTLogInfo(@"SkipBackward");
  
    SpotifyModule *spotifyModule = (SpotifyModule *)[SpotifyModule sharedManager];
    [spotifyModule.player skipPrevious:^(NSError *error) {
        if (error != nil) {
            NSLog(@"*** failed to resume pause: %@", error);
            return;
        }
      }];
}

RCT_EXPORT_METHOD(login:(NSString *)token)
{
    RCTLogInfo(@"Logging In");
    RCTLogInfo(@"%@", token);

  
  
  
  //save the login callback
  SpotifyModule *spotifyModule = (SpotifyModule *)[SpotifyModule sharedManager];
  spotifyModule.player = [SPTAudioStreamingController sharedInstance];
  
  NSError *audioStreamingInitError;
  NSAssert([spotifyModule.player startWithClientId:@"d2419f567d224eacbafe2bae5e73e046" error:&audioStreamingInitError],
             @"There was a problem starting the Spotify SDK: %@", audioStreamingInitError.description);
  //setup event dispatcher
  spotifyModule.eventDispatcher = [[RCTEventDispatcher alloc] init];
  [spotifyModule.eventDispatcher setValue:self.bridge forKey:@"bridge"];

  spotifyModule.player.delegate = spotifyModule;

  [spotifyModule.player loginWithAccessToken:token];
  

}


/*
 * The method that you need to call when the application is opened through a Custom URL Scheme
 * (Here it would be whenever the webview redirects to: 'my-super-application://callback')
 */
+ (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
  
  RCTLogInfo(@"Login Callback");
  
  
  // Ask SPTAuth if the URL given is a Spotify authentication callback
  if ([[SPTAuth defaultInstance] canHandleURL:url]) {
    
    // The 'session' object contains all the data returned by the Spotify API
    [[SPTAuth defaultInstance] handleAuthCallbackWithTriggeredAuthURL:url callback:^(NSError *error, SPTSession *session) {
      
      // If anything failed, logs the error then returns
      if (error != nil) {
        NSLog(@"*** Auth error: %@", error);
        return;
      }
      
      RCTLogInfo(@"Login Successful");
      
      SpotifyModule *spotifyModule = (SpotifyModule *)[SpotifyModule sharedManager];
      spotifyModule.session = session;
      //spotifyModule.player = [SPTAudioStreamingController sharedInstance];
      [spotifyModule.player loginWithAccessToken:session.accessToken];
      
      // The object that will be returned to the JS callback
      NSDictionary *inventory = nil;
      
      // Converts the NSDate expiration date to a Unix timestamp
      NSTimeInterval timestamp = [session.expirationDate timeIntervalSince1970];
      NSString *expirationDate = [NSString stringWithFormat:@"%ld", (long)timestamp];
      
      // If a token swap URL was provided, extracts all the fields
      if([[SPTAuth defaultInstance] hasTokenSwapService])
      {
        // We swapped the short lived token for a real one; which means we have access
        // to an access/refresh token and an expiration date
        inventory = @{
                      @"accessToken" : session.accessToken,
                      @"refreshToken" : session.encryptedRefreshToken,
                      @"expirationDate": expirationDate
                      };
      }
      else
      {
        // If we're in the 'Implicit Grant' case, only retrieves the access token, since that is the only
        // thing we have access to
        inventory = @{
                      @"accessToken" : session.accessToken,
                      @"expirationDate": expirationDate
                      };
      }
      
      // Sends the 'inventory' object to the js Callback
      spotifyModule.loginCallback(@[inventory]);
    }];
    
    return YES;
  }
  
  return NO;
}

- (void)audioStreamingDidLogin:(SPTAudioStreamingController *)audioStreaming
{
    /*RCTLogInfo(@"We Made it");
    SpotifyModule *spotifyModule = (SpotifyModule *)[SpotifyModule sharedManager];
    [spotifyModule.player playSpotifyURI:@"spotify:track:58s6EuEYJdlb0kO7awm3Vp" startingWithIndex:0 startingWithPosition:0 callback:^(NSError *error) {
        if (error != nil) {
            NSLog(@"*** failed to play: %@", error);
            return;
        }
    }];*/
}




@end
