//
//  SpotifyAuth.m
//  Fjord
//
//  Created by Daniel Vick on 4/3/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "SpotifyAuth.h"

@interface SpotifyAuth ()
@property (nonatomic, strong) SPTAuth *auth;
@property (nonatomic, strong) SPTAudioStreamingController *player;
@property (nonatomic, strong) UIViewController *authViewController;
@end

@implementation SpotifyAuth

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(startAuthenticationFlow:(RCTResponseSenderBlock)block) {
  self.auth = [SPTAuth defaultInstance];
  self.player = [SPTAudioStreamingController sharedInstance];
  
  // The client ID you got from the developer site
  self.auth.clientID = @"d2419f567d224eacbafe2bae5e73e046";
  // The redirect URL as you entered it at the developer site
  self.auth.redirectURL = [NSURL URLWithString:@"fjord-login://loginreturn"];
  // Setting the `sessionUserDefaultsKey` enables SPTAuth to automatically store the session object for future use.
  self.auth.sessionUserDefaultsKey = @"current session";
  // Set the scopes you need the user to authorize. `SPTAuthStreamingScope` is required for playing audio.
  self.auth.requestedScopes = @[SPTAuthStreamingScope];
  
  // Become the streaming controller delegate
  self.player.delegate = self;
  
  // Start up the streaming controller.
  NSError *audioStreamingInitError;
  NSAssert([self.player startWithClientId:self.auth.clientID error:&audioStreamingInitError],
           @"There was a problem starting the Spotify SDK: %@", audioStreamingInitError.description);
  
  // Start authenticating when the app is finished launching
  
  
  
  
}
