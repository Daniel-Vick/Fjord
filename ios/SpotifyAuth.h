//
//  SpotifyAuth.h
//  Fjord
//
//  Created by Daniel Vick on 4/3/17.
//  Copyright © 2017 Facebook. All rights reserved.
//
#import <UIKit/UIKit.h>
#import <SpotifyAuthentication/SpotifyAuthentication.h>
#import <SpotifyAudioPlayback/SpotifyAudioPlayback.h>
#import <SafariServices/SafariServices.h>
#import <React/RCTBridgeModule.h>

@interface SpotifyAuth : UIResponder <SPTAudioStreamingDelegate>

@property (nonatomic, strong) UIWindow *window;

@end

