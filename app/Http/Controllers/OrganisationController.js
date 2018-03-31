'use strict'

const Database = use('Database')
const User = use('App/Model/User')
const Organisation = use('App/Model/Organisation')
const OrganisationDoc = use('App/Model/OrganisationDoc')
const OrganisationOwner = use('App/Model/OrganisationOwner')
const Helpers = use('Helpers')
const fs = use('fs')
const Env = use('Env')
const moment = use('moment')

class OrganisationController {
  * addOrganisation (request, response) {

    let user = yield User.find(request.currentUser.id)

    user = user.toJSON()

    yield response.sendView('organisation.add', {
      user: user
    })
    return
  }

  * addPostOrganisation (request, response) {

    // user_id
    // organisation_name
    // organisation_description
    // organisation_email
    // organisation_contact
    // organisation_location

    // society_registration_certificate
    // memorandum_association
    // certificate_incorporation
    // fcra_certificate
    // a_12_certificate
    // g_80_certificate
    // latest_report
    // auditor_report
    // pan_number
    // tan_number

    let user = yield User.find(request.currentUser.id)

    user = user.toJSON()

    // Get all the input data
    let user_id = request.input('user_id')

    const organisation = new Organisation()
    organisation.ngodarpan_id = request.input('organisation_ngodarpan_id')
    organisation.name = request.input('organisation_name')
    organisation.description = request.input('organisation_description')
    organisation.email = request.input('organisation_email')
    organisation.contact = request.input('organisation_contact')
    organisation.location = request.input('organisation_location')

    yield organisation.save()

    let registered_org = yield Organisation.findBy('name', request.input('organisation_name'))
    registered_org = registered_org.toJSON()

    let organisation_id = registered_org.id

    const organisationOwner = new OrganisationOwner()
    organisationOwner.organisation_id = organisation_id
    organisationOwner.user_id = user.id
    yield organisationOwner.save()



    const organisation_doc = new OrganisationDoc()


    let cs_determinant = 0

    let doc1 = null
    let doc2 = null
    let doc3 = null
    let doc4 = null
    let doc5 = null
    let doc6 = null
    let doc7 = null
    let doc8 = null
    let doc9 = null
    let doc10 = null


    let doc1Name = null
    let doc1Path = null
    let doc1Ext = null

    let doc2Name = null
    let doc2Path = null
    let doc2Ext = null

    let doc3Name = null
    let doc3Path = null
    let doc3Ext = null

    let doc4Name = null
    let doc4Path = null
    let doc4Ext = null

    let doc5Name = null
    let doc5Path = null
    let doc5Ext = null

    let doc6Name = null
    let doc6Path = null
    let doc6Ext = null

    let doc7Name = null
    let doc7Path = null
    let doc7Ext = null

    let doc8Name = null
    let doc8Path = null
    let doc8Ext = null

    let doc9Name = null
    let doc9Path = null
    let doc9Ext = null

    let doc10Name = null
    let doc10Path = null
    let doc10Ext = null

    if (request.file('society_registration_certificate') !== undefined && request.file('society_registration_certificate') !== null && request.file('society_registration_certificate') !== '' && request.file('society_registration_certificate').clientSize() !== 0) {
      if (!fs.existsSync(Helpers.publicPath('img/storage/organisations/organisation_' + organisation_id))) {
        fs.mkdirSync(Helpers.publicPath('img/storage/organisations/organisation_' + organisation_id))
      }

      doc1 = request.file('society_registration_certificate', {
        maxSize: '1mb'
      })

      doc1Name = `${new Date().getTime()}_${doc1.clientName()}`

      yield doc1.move(Helpers.publicPath('img/storage/organisations/organisation_' + organisation_id), doc1Name)

      if (!doc1.moved()) {
        response.badRequest(doc1.errors())
        return
      }

      doc1Path = Env.get('MANAGE_URL', 'localhost:4040') + 'img/storage/organisations/organisation_' + organisation_id + '/' + doc1Name
      doc1Ext = doc1.extension()

      organisation_doc.society_registration_certificate = doc1Path
      cs_determinant++
    }

    if (request.file('memorandum_association') !== undefined && request.file('memorandum_association') !== null && request.file('memorandum_association') !== '' && request.file('memorandum_association').clientSize() !== 0) {
      if (!fs.existsSync(Helpers.publicPath('img/storage/organisations/organisation_' + organisation_id))) {
        fs.mkdirSync(Helpers.publicPath('img/storage/organisations/organisation_' + organisation_id))
      }

      doc2 = request.file('memorandum_association', {
        maxSize: '1mb'
      })

      doc2Name = `${new Date().getTime()}_${doc2.clientName()}`

      yield doc2.move(Helpers.publicPath('img/storage/organisations/organisation_' + organisation_id), doc2Name)

      if (!doc2.moved()) {
        response.badRequest(doc2.errors())
        return
      }

      doc2Path = Env.get('MANAGE_URL', 'localhost:4040') + 'img/storage/organisations/organisation_' + organisation_id + '/' + doc2Name
      doc2Ext = doc2.extension()

      organisation_doc.memorandum_association = doc2Path
      cs_determinant++
    }

    if (request.file('certificate_incorporation') !== undefined && request.file('certificate_incorporation') !== null && request.file('certificate_incorporation') !== '' && request.file('certificate_incorporation').clientSize() !== 0) {
      if (!fs.existsSync(Helpers.publicPath('img/storage/organisations/organisation_' + organisation_id))) {
        fs.mkdirSync(Helpers.publicPath('img/storage/organisations/organisation_' + organisation_id))
      }

      doc3 = request.file('certificate_incorporation', {
        maxSize: '1mb'
      })

      doc3Name = `${new Date().getTime()}_${doc3.clientName()}`

      yield doc3.move(Helpers.publicPath('img/storage/organisations/organisation_' + organisation_id), doc3Name)

      if (!doc3.moved()) {
        response.badRequest(doc3.errors())
        return
      }

      doc3Path = Env.get('MANAGE_URL', 'localhost:4040') + 'img/storage/organisations/organisation_' + organisation_id + '/' + doc3Name
      doc3Ext = doc3.extension()

      organisation_doc.certificate_incorporation = doc3Path
      cs_determinant++
    }

    if (request.file('fcra_certificate') !== undefined && request.file('fcra_certificate') !== null && request.file('fcra_certificate') !== '' && request.file('fcra_certificate').clientSize() !== 0) {
      if (!fs.existsSync(Helpers.publicPath('img/storage/organisations/organisation_' + organisation_id))) {
        fs.mkdirSync(Helpers.publicPath('img/storage/organisations/organisation_' + organisation_id))
      }

      doc4 = request.file('fcra_certificate', {
        maxSize: '1mb'
      })

      doc4Name = `${new Date().getTime()}_${doc4.clientName()}`

      yield doc4.move(Helpers.publicPath('img/storage/organisations/organisation_' + organisation_id), doc4Name)

      if (!doc4.moved()) {
        response.badRequest(doc4.errors())
        return
      }

      doc4Path = Env.get('MANAGE_URL', 'localhost:4040') + 'img/storage/organisations/organisation_' + organisation_id + '/' + doc4Name
      doc4Ext = doc4.extension()

      organisation_doc.fcra_certificate = doc4Path
      cs_determinant++
    }

    if (request.file('a_12_certificate') !== undefined && request.file('a_12_certificate') !== null && request.file('a_12_certificate') !== '' && request.file('a_12_certificate').clientSize() !== 0) {
      if (!fs.existsSync(Helpers.publicPath('img/storage/organisations/organisation_' + organisation_id))) {
        fs.mkdirSync(Helpers.publicPath('img/storage/organisations/organisation_' + organisation_id))
      }

      doc5 = request.file('a_12_certificate', {
        maxSize: '1mb'
      })

      doc5Name = `${new Date().getTime()}_${doc5.clientName()}`

      yield doc5.move(Helpers.publicPath('img/storage/organisations/organisation_' + organisation_id), doc5Name)

      if (!doc5.moved()) {
        response.badRequest(doc5.errors())
        return
      }

      doc5Path = Env.get('MANAGE_URL', 'localhost:4040') + 'img/storage/organisations/organisation_' + organisation_id + '/' + doc5Name
      doc5Ext = doc5.extension()

      organisation_doc.a_12_certificate = doc5Path
      cs_determinant++
    }

    if (request.file('g_80_certificate') !== undefined && request.file('g_80_certificate') !== null && request.file('g_80_certificate') !== '' && request.file('g_80_certificate').clientSize() !== 0) {
      if (!fs.existsSync(Helpers.publicPath('img/storage/organisations/organisation_' + organisation_id))) {
        fs.mkdirSync(Helpers.publicPath('img/storage/organisations/organisation_' + organisation_id))
      }

      doc6 = request.file('g_80_certificate', {
        maxSize: '1mb'
      })

      doc6Name = `${new Date().getTime()}_${doc6.clientName()}`

      yield doc6.move(Helpers.publicPath('img/storage/organisations/organisation_' + organisation_id), doc6Name)

      if (!doc6.moved()) {
        response.badRequest(doc6.errors())
        return
      }

      doc6Path = Env.get('MANAGE_URL', 'localhost:4040') + 'img/storage/organisations/organisation_' + organisation_id + '/' + doc6Name
      doc6Ext = doc6.extension()

      organisation_doc.g_80_certificate = doc6Path
      cs_determinant++
    }

    if (request.file('latest_report') !== undefined && request.file('latest_report') !== null && request.file('latest_report') !== '' && request.file('latest_report').clientSize() !== 0) {
      if (!fs.existsSync(Helpers.publicPath('img/storage/organisations/organisation_' + organisation_id))) {
        fs.mkdirSync(Helpers.publicPath('img/storage/organisations/organisation_' + organisation_id))
      }

      doc7 = request.file('latest_report', {
        maxSize: '1mb'
      })

      doc7Name = `${new Date().getTime()}_${doc7.clientName()}`

      yield doc7.move(Helpers.publicPath('img/storage/organisations/organisation_' + organisation_id), doc7Name)

      if (!doc7.moved()) {
        response.badRequest(doc7.errors())
        return
      }

      doc7Path = Env.get('MANAGE_URL', 'localhost:4040') + 'img/storage/organisations/organisation_' + organisation_id + '/' + doc7Name
      doc7Ext = doc7.extension()

      organisation_doc.latest_report = doc7Path
      cs_determinant++
    }

    if (request.file('auditor_report') !== undefined && request.file('auditor_report') !== null && request.file('auditor_report') !== '' && request.file('auditor_report').clientSize() !== 0) {
      if (!fs.existsSync(Helpers.publicPath('img/storage/organisations/organisation_' + organisation_id))) {
        fs.mkdirSync(Helpers.publicPath('img/storage/organisations/organisation_' + organisation_id))
      }

      doc8 = request.file('auditor_report', {
        maxSize: '1mb'
      })

      doc8Name = `${new Date().getTime()}_${doc8.clientName()}`

      yield doc8.move(Helpers.publicPath('img/storage/organisations/organisation_' + organisation_id), doc8Name)

      if (!doc8.moved()) {
        response.badRequest(doc8.errors())
        return
      }

      doc8Path = Env.get('MANAGE_URL', 'localhost:4040') + 'img/storage/organisations/organisation_' + organisation_id + '/' + doc8Name
      doc8Ext = doc8.extension()

      organisation_doc.auditor_report = doc8Path
      cs_determinant++
    }

    if (request.file('pan_number') !== undefined && request.file('pan_number') !== null && request.file('pan_number') !== '' && request.file('pan_number').clientSize() !== 0) {
      if (!fs.existsSync(Helpers.publicPath('img/storage/organisations/organisation_' + organisation_id))) {
        fs.mkdirSync(Helpers.publicPath('img/storage/organisations/organisation_' + organisation_id))
      }

      doc9 = request.file('pan_number', {
        maxSize: '1mb'
      })

      doc9Name = `${new Date().getTime()}_${doc9.clientName()}`

      yield doc9.move(Helpers.publicPath('img/storage/organisations/organisation_' + organisation_id), doc9Name)

      if (!doc9.moved()) {
        response.badRequest(doc9.errors())
        return
      }

      doc9Path = Env.get('MANAGE_URL', 'localhost:4040') + 'img/storage/organisations/organisation_' + organisation_id + '/' + doc9Name
      doc9Ext = doc9.extension()

      organisation_doc.pan_number = doc9Path
      cs_determinant++
    }

    if (request.file('tan_number') !== undefined && request.file('tan_number') !== null && request.file('tan_number') !== '' && request.file('tan_number').clientSize() !== 0) {
      if (!fs.existsSync(Helpers.publicPath('img/storage/organisations/organisation_' + organisation_id))) {
        fs.mkdirSync(Helpers.publicPath('img/storage/organisations/organisation_' + organisation_id))
      }

      doc10 = request.file('tan_number', {
        maxSize: '1mb'
      })

      doc10Name = `${new Date().getTime()}_${doc10.clientName()}`

      yield doc10.move(Helpers.publicPath('img/storage/organisations/organisation_' + organisation_id), doc10Name)

      if (!doc10.moved()) {
        response.badRequest(doc10.errors())
        return
      }

      doc10Path = Env.get('MANAGE_URL', 'localhost:4040') + 'img/storage/organisations/organisation_' + organisation_id + '/' + doc10Name
      doc10Ext = doc10.extension()

      organisation_doc.tan_number = doc10Path
      cs_determinant++
    }

    if(doc1 || doc2 || doc3 || doc4 || doc5 || doc6 || doc7 || doc8 || doc9 || doc10) {
      organisation_doc.organisation_id = organisation_id
      yield organisation_doc.save()
    }

    // Normalise Credibility Score
    let cs = cs_determinant * 10
    const affectedRows = yield Database
      .table('organisations')
      .where('id', organisation_id)
      .update({ credibility_score: cs })


    yield request
        .with({success: 'Organisation added successfully!'})
        .flash()

    response.redirect('back')
    return
  }

  * viewOrganisation (request,response) {
    let user = yield User.find(request.currentUser.id)
    user = user.toJSON()

    const id = request.param('id')

    let organisationDetails = yield OrganisationOwner.query().where('organisation_id', id).with('user','organisation').fetch()
    let organisationDocs = yield OrganisationDoc.query().where('organisation_id', id).fetch()

    organisationDetails = organisationDetails.toJSON()
    organisationDocs = organisationDocs.toJSON()

    yield response.sendView('organisation.view', {
      user: user,
      organisationDetails: organisationDetails,
      organisationDocs: organisationDocs
    })
    return
  }

  * getOrganisations (request, response) {
  
    let user
    if(request.currentUser) {
      user = yield User.find(request.currentUser.id)
      user = user.toJSON()
    }
    
    let organisations = yield Organisation.query().orderBy('created_at', 'desc').fetch()
    // response.ok(organisations)

    yield response.sendView('organisation.index', {
      user: user,
      organisations: organisations
    })
    return
  }
}

module.exports = OrganisationController
