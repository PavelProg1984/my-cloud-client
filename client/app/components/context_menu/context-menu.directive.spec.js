describe('context menu directive', function () {
    'use strict';

    var scope, element, document;

    // Mock the download module(a dependency of the app.context-menu module)
    angular.module('download', []);

    // Load the app.context-menu module
    beforeEach(module('app.context-menu'));

    beforeEach(function () {
        module(function ($provide) {
            // Mock the contextMenuService
            $provide.factory('contextMenuService', function () {
                var getActions = jasmine.createSpy('getActions').and.callFake(function (type) {
                    return [];
                });
                return {
                    getActions: getActions,
                    getTopPosition: function () {
                        return 0;
                    },
                    getLeftPosition: function () {
                        return 0;
                    }
                };
            });
            // Mock the downloadService
            $provide.factory('downloadService', function () {
                var download = jasmine.createSpy('download').and.callFake(function (fileName) {
                });
                return {
                    download: download
                };
            });
        });
    });

    beforeEach(inject(function ($compile, $rootScope, $httpBackend, $document) {
        scope = $rootScope.$new();
        element = angular.element('<ul id="context-menu" mcc-context-menu></ul>');
        $compile(element)(scope);
        $httpBackend.expect('GET', 'app/components/context_menu/context-menu.html').respond(200, '');
        $httpBackend.flush();
        scope.$digest();
        document = $document;
    }));

    it('should create the context menu by the right click on the document', inject(function (contextMenuService) {
        document.triggerHandler('contextmenu');
        expect(contextMenuService.getActions).toHaveBeenCalledWith('document');
    }));

    it('should have the "opened" class when right clicking', function () {
        document.triggerHandler('contextmenu');
        expect(element.hasClass('opened')).toBeTruthy();
    });

    it('should hide the context menu by the click on the document', function () {
        document.triggerHandler('click');
        expect(element.hasClass('opened')).toBeFalsy();
    });

    it('should call the "upload" event by click on the "upload" action', function () {
        var controller = element.controller('mccContextMenu');
        spyOn(scope, '$emit');
        controller.click({name: 'upload'});
        expect(scope.$emit).toHaveBeenCalledWith('upload');
    });

    it('should call the "createFolder" event by click on the "create-folder" action', function () {
        var controller = element.controller('mccContextMenu');
        spyOn(scope, '$emit');
        controller.click({name: 'create-folder'});
        expect(scope.$emit).toHaveBeenCalledWith('createFolder');
    });

    it('should download the file by click on the "download" action', inject(function (downloadService) {
        var controller = element.controller('mccContextMenu');
        scope.fileName = 'testFile';
        controller.click({name: 'download'});
        expect(downloadService.download).toHaveBeenCalledWith('admin@mail.com', 'testFile');
    }));
});
