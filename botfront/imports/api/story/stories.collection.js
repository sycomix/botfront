import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { StorySchema } from './stories.schema';

export const Stories = new Mongo.Collection('stories');

// Deny all client-side updates on the Projects collection
Stories.deny({
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove() {
        return true;
    },
});

if (Meteor.isServer) {
    Meteor.publish('stories.inGroup', function(projectId, groupId) {
        check(groupId, String);
        check(projectId, String);
        return Stories.find({ projectId, storyGroupId: groupId });
    });

    Meteor.publish('stories.light', function(projectId) {
        check(projectId, String);
        return Stories.find({ projectId }, { fields: { title: true, checkpoints: true, storyGroupId: true } });
    });
    Meteor.publish('stories.events', function(projectId) {
        check(projectId, String);
        return Stories.find({ projectId }, { fields: { title: true, events: true } });
    });
}

Stories.attachSchema(StorySchema);
