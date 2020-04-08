import DS from 'ember-data';
import { computed } from '@ember/object';
const { Model, attr, belongsTo } = DS;

export default Model.extend({
  uri: attr(),
  address: attr(),
  created: attr('date'),
  modified: attr('date'),
  download: belongsTo('file', { inverse: null }),
  downloadStatus: attr(),
  creator: attr(),

  downloadSuccess: computed('dowloadStatus', function(){
    return this.downloadStatus === 'http://lblod.data.gift/file-download-statuses/success';
  }),

  downloadOngoing: computed('dowloadStatus', function(){
    const ongoingStatuses = ['http://lblod.data.gift/file-download-statuses/ongoing',
                             'http://lblod.data.gift/file-download-statuses/ready-to-be-cached'
                            ];
    return ongoingStatuses.includes(this.downloadStatus);
  }),

  downloadFailed: computed('dowloadStatus', function(){
    return this.downloadStatus === 'http://lblod.data.gift/file-download-statuses/failure';
  }),

  downloadLink: computed('filename', function () {
    return `/files/${this.id}/download`;
  })
});
