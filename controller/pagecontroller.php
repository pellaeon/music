<?php

/**
 * ownCloud - Music app
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Morris Jobke <hey@morrisjobke.de>
 * @copyright Morris Jobke 2013, 2014
 */

namespace OCA\Music\Controller;

use \OCP\AppFramework\Controller;
use \OCP\IRequest;
use \OCP\IURLGenerator;

use \OCA\Music\Utility\Scanner;


class PageController extends Controller {

	private $appname;
	private $l10n;
	private $scanner;
	private $status;
	private $urlgenerator;

	public function __construct($appname,
								IRequest $request,
								Scanner $scanner,
								IURLGenerator $urlgenerator){
		parent::__construct($appname, $request);

		$this->appname = $appname;
		$this->scanner = $scanner;
		$this->urlgenerator = $urlgenerator;
	}


	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 */
	public function index() {
		return $this->render('main', array('mainjs' => $this->urlgenerator->linkTo($this->appname, 'js/public/main.js')));
	}
}
